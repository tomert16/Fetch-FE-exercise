import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/request.config';

export const fetchDogBreeds = createAsyncThunk(
    'dogs/fetchDogBreeds',
    async() => {
        const req = await axiosInstance.get(`/dogs/breeds`);
        return req.data;
    }
)

const dogsSlice = createSlice({
    name: 'dogs',
    initialState: {
        breeds: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDogBreeds.fulfilled, (state, action) => {
                state.breeds = action.payload;
            })
    }
});

export const selectDogBreeds = (state) => state.dogs.breeds;
export default dogsSlice.reducer;