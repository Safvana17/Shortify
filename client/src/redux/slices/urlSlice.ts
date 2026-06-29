import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"
import api from "../../lib/axios"
import { API_ROUTES } from "../../constants/api.routes"
import type { GetAllLinksResponse, Url } from "../../types/Url"


interface UrlState {
    loading: boolean
    error: string | null
    url: string | null
    urls: Url[]
    pagination: {
        url: {
            totalPages: number,
            totalCount: number
        }
    }
}

const initialState: UrlState = {
    loading: false,
    error: null,
    url: null,
    urls: [],
    pagination: {
        url: {
            totalCount: 0,
            totalPages: 0
        }
    }
}

export const shortUrl = createAsyncThunk <
string,
{url: string},
{rejectValue: string}
>('url/short', async(url, { rejectWithValue}) => {
    try {
        const response = await api.post(API_ROUTES.USER.LINK.SHORT, url)
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }

        return response.data.data
    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'Failed to shorten url')
    }
})

export const getAllLink = createAsyncThunk <
GetAllLinksResponse,
{params: { page: number, limit: number}},
{rejectValue: string}
>('url/getAll', async({params}, { rejectWithValue}) => {
    try {
        const response = await api.get(API_ROUTES.USER.LINK.GET_ALL, {params})
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }
console.log('response: ', response.data.data)
        return response.data.data
        
    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'Failed to get all urls')
    }
})

const urlSlice = createSlice ({
    name: 'UrlSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(shortUrl.pending, (state) => {
            state.loading = true
          })
          .addCase(shortUrl.fulfilled, (state, action) => {
            state.loading = false
            state.url = action.payload
            state.error = null
          })
          .addCase(shortUrl.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Failed to short url'
          })
          .addCase(getAllLink.pending, (state) => {
            state.loading = true
          })
          .addCase(getAllLink.fulfilled, (state, action) => {
            state.loading = false
            state.urls = action.payload.urls
            state.pagination.url.totalCount = action.payload.totalCount
            state.pagination.url.totalPages = action.payload.totalPages
            state.error = null
          })
          .addCase(getAllLink.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Failed toget all urls'
          })
    }
})


export default urlSlice.reducer