import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"
import api from "../../lib/axios"
import { API_ROUTES } from "../../constants/api.routes"

interface UrlState {
    loading: boolean
    error: string | null
    url: string | null
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

// export const getLink = createAsyncThunk <
// void,
// {url: string},
// {rejectValue: string}
// >('url/short', async(url, { rejectWithValue}) => {
//     try {
//         const response = await api.post(API_ROUTES.USER.LINK.SHORT, url)
//         if(!response.data.success){
//             return rejectWithValue("Invalid response")
//         }

//         return response.data.data
//     } catch (error) {
//         const err = error as AxiosError<{message: string}>
//         return rejectWithValue(err.response?.data.message || 'Failed to shorten url')
//     }
// })

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
    }
})


export default urlSlice.reducer