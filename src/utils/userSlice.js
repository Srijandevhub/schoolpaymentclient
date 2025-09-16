import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../baseUrl";
export const checkAuth = createAsyncThunk("checkAuth/user", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${baseUrl}/auth/protected`, {
            withCredentials: true
        });
        return res.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        isAuthenticated: false,
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.status = 'loading';
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.status = 'success';
            state.data = action.payload;
            state.isAuthenticated = true;
        }).addCase(checkAuth.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
});
export default userSlice.reducer