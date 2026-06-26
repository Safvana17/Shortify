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
    }
})

export default authSlice.reducer