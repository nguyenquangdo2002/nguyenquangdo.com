import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: true,   // có đăng nhập không
    isLoading: true,         // đang xử lý yêu cầu?
    user: null               // thông tin người dùng
}

// Gửi formData đến endpoint đăng ký người dùng.
// withCredentials: true: gửi cookie/session để server nhận diện người dùng.
// Nếu có lỗi, trả về thông tin lỗi qua thunkAPI.rejectWithValue().
export const registerUser = createAsyncThunk("/auth/register",
    async (formData, thunkAPI) => {
        try {
            const responseRegister = await axios.post("http://localhost:5000/api/auth/register", formData, {
                withCredentials: true,
            }
            );
            return responseRegister.data;
        } catch (error) {

            return thunkAPI.rejectWithValue(error.responseRegister.data)
        }
    }

);
export const loginUser = createAsyncThunk("/auth/login",
    async (formData, thunkAPI) => {
        try {
            const responseLogin = await axios.post("http://localhost:5000/api/auth/login", formData, {
                withCredentials: true,
            })
            return responseLogin.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.responseLogin.data)
        }
    }
)
export const checkAuth = createAsyncThunk("/auth/checkauth",
    async (thunkAPI) => {
        try {
            const responseCheckAuth = await axios.get("http://localhost:5000/api/auth/check-auth", {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store,no-cache , must-revalidate ,proxy-revalidate',
                    Expires: '0',
                }

            })
            return responseCheckAuth.data;
        } catch (error) {
            const message = error.responseCheckAuth?.data || {
                success: false,
                message: "Something went wrong",
            };
            return thunkAPI.rejectWithValue(message);
        }

    }
)
// reducers: chứa các action đồng bộ (synchronous) — ví dụ như setUser (chưa được implement ở đây).
// extraReducers: xử lý các action được tạo ra bởi createAsyncThunk.
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = null;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;