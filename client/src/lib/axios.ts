import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import type { store as storeType } from "../redux/store"
import { setAccessToken } from "../redux/slices/authSlice"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api/v1` : 'http://localhost:4000/api/v1'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry: boolean
}


const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
})

let isRefreshing = false

let failedQueue: {
    resolve: (value?: unknown) => void
    reject: (value?: unknown) => void
}[] = []

const processQueu = (error: unknown) => {
    failedQueue.forEach((promise) => {
        if(error){
            promise.reject(error)
        }else {
            promise.resolve(null)
        }
    })
    failedQueue = []
}

let store: typeof storeType;

export const injectStore = (_store: typeof storeType) => {
    store = _store
}

api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig

        if(!error.response){
            console.log("Network error or server not reachable")
            return Promise.reject(error)
        }

        if(
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/refresh") &&
            !originalRequest.url?.includes("/login") &&
            !originalRequest.url?.includes("/register")
        ) {
            if(isRefreshing){
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                }).then(() => api(originalRequest))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const response = await api.post('/auth/refresh', {}, { withCredentials: true})
                const newAccessToken = response.data.data.accessToken
                if(!newAccessToken){
                    console.log('Token not found', response.data.data)
                    throw new Error('Access token not in refresh response')
                }

                if(store)
                   store.dispatch(setAccessToken(newAccessToken))

                processQueu(null)
                return api(originalRequest)

            } catch (refreshError) {
                processQueu(refreshError)
                if(store)
                   store.dispatch(setAccessToken(null))
                
                return Promise.reject(refreshError)
            }finally {
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)




export default api