import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/authSlice'
import { injectStore } from '../lib/axios'
import UrlSlice from './slices/urlSlice'


export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        url: UrlSlice
    }
})


injectStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch