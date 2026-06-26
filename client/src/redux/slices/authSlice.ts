import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RegisterUserPayload, User } from "../../types/User"
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
        return rejectWithValue(typeof err === 'string' ? err : 'Failed to register user')
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
        return rejectWithValue(typeof err === 'string' ? err : 'Failed to verify otp')
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
        return rejectWithValue(typeof err === 'string' ? err : 'Failed to resend otp')
    }
})


const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.loading = true
          })
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
    }
})

export default authSlice.reducer