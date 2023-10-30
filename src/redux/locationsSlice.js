import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/request.config";

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async(zipCodes) => {
        const req = await axiosInstance.post('/locations', zipCodes);
        return req.data;
    }
)

const locationsSlice = createSlice({
    name: "locations",
    initialState: {
        list: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.list = action.payload;
            })
    }
});

export const selectLocations = (state) => state.locations.list;
export default locationsSlice.reducer;