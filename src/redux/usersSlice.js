import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/request.config";

export const userLogin = createAsyncThunk(
    'users/userLogin',
    async({name, email}) => {
        const reqBody = { name, email };
        const req = await axiosInstance.post('/auth/login', reqBody);
        return req.data;
    }
);

export const userLogout = createAsyncThunk(
    'users/userLogout',
    async() => {
        const req = await axiosInstance.post('/auth/logout');
        return req.data;
    }
)

const userSlice = createSlice({
    name: "users",
    initialState: {
        loggedInUser: undefined
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loggedInUser = null;
            })
    }
});

export default userSlice.reducer;