import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginUserResponse, RegisterUserPayload, User } from "../../types/User"
import type { AxiosError } from "axios";
import api from "../../lib/axios";
import { API_ROUTES } from "../../constants/api.routes";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    accessToken: string | null
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    accessToken: null  
}

export const registerUser = createAsyncThunk<
{email: string},
RegisterUserPayload,
{rejectValue: string}
>('user/register', async(data, {rejectWithValue}) => {
    try {

        const response = await api.post(API_ROUTES.AUTH.REGISTER, data)
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }
        return response.data.data

    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'Failed to register user')
    }
})

export const verifyOtp = createAsyncThunk<
void,
{email: string, otp: string},
{rejectValue: string}
>('user/verify-otp', async({email, otp}, {rejectWithValue}) => {
    try {

        const response = await api.post(API_ROUTES.AUTH.VERIFY_OTP, {email, otp})
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }
        return response.data.data

    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'Failed to verify otp')
    }
})

export const resendOtp = createAsyncThunk<
void,
{email: string},
{rejectValue: string}
>('user/resend-otp', async(email, {rejectWithValue}) => {
    try {

        const response = await api.post(API_ROUTES.AUTH.RESEND_OTP, {email})
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }
        return response.data.data

    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'Failed to resend otp')
    }
})

export const login = createAsyncThunk<
LoginUserResponse,
{email: string, password: string},
{rejectValue: string}
>('user/login', async({email, password}, {rejectWithValue}) => {
    try {

        const response = await api.post(API_ROUTES.AUTH.LOGIN, {email, password})
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }
        return response.data.data

    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'User login failed')
    }
})

export const checkAuth = createAsyncThunk<
{accessToken: string; user: User },
void,
{rejectValue: string}
>('user/checkAuth', async(_NEVER, { rejectWithValue}) => {
    try {
        const response = await api.post(API_ROUTES.AUTH.REFRESH)
        return response.data.data
    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'User login failed')       
    }
})

export const logout = createAsyncThunk<
void,
void,
{rejectValue: string}
>('user/logout', async(_, {rejectWithValue}) => {
    try {

        const response = await api.post(API_ROUTES.AUTH.LOGOUT)
        if(!response.data.success){
            return rejectWithValue("Invalid response")
        }
        return 

    } catch (error) {
        const err = error as AxiosError<{message: string}>
        return rejectWithValue(err.response?.data.message || 'User logout failed')
    }
})

const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setAccessToken: (state,action) =>{
            state.accessToken = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        //   .addCase(registerUser.pending, (state) => {
        //     state.loading = true
        //   })
          .addCase(registerUser.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Failed to register user'
          })
          .addCase(verifyOtp.pending, (state) => {
            state.loading = true
          })
          .addCase(verifyOtp.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(verifyOtp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Failed to verify otp'
          })
          .addCase(resendOtp.pending, (state) => {
            state.loading = true
          })
          .addCase(resendOtp.fulfilled, (state) => {
            state.loading = false
          })
          .addCase(resendOtp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Failed to resend otp'
          })
        //   .addCase(login.pending, (state) => {
        //     state.loading = true
        //   })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'User login failed'
          })
          .addCase(checkAuth.pending, (state) => {
            state.loading = true
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
          })
          .addCase(checkAuth.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.isAuthenticated = false
            state.error = action.payload || 'User login failed'
          })
          .addCase(logout.pending, (state) => {
            state.loading = true
          })
          .addCase(logout.fulfilled, (state) => {
            state.loading = false
            state.accessToken = null 
            state.user = null
            state.isAuthenticated = false
          })
          .addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'User logout failed'
          })
    }
})

export const { setAccessToken } = authSlice.actions
export default authSlice.reducer