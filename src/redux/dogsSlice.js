import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/request.config';

export const fetchDogBreeds = createAsyncThunk(
    'dogs/fetchDogBreeds',
    async() => {
        const req = await axiosInstance.get(`/dogs/breeds`);
        return req.data;
    }
);

export const fetchDogs = createAsyncThunk(
    'dogs/fetchDogs',
    async(params) => {
        const req = await axiosInstance.get(`/dogs/search`, { params });
        return req.data;
    }
);

export const fetchDogData = createAsyncThunk(
    'dogs/fetchDogDetails',
    async(resultIds) => {
        const req = await axiosInstance.post('/dogs', resultIds);
        return req.data;
    }
);

export const createMatch = createAsyncThunk(
    'dogs/createMatch',
    async(likedList) => {
        const req = await axiosInstance.post('/dogs/match', likedList);
        return req.data;
    }
)


const dogsSlice = createSlice({
    name: 'dogs',
    initialState: {
        breeds: [],
        dogs: [],
        data: [],
        searchState: '',
        match: undefined,
    },
    reducers: {
        breedSearch: (state, action) => {
            state.searchState = action.payload;
        },
        sortedDogs: (state, action) => {
            const {dropdown} = action.payload;
            if (dropdown === 'none') {
                state.data;
            } else if (dropdown === 'nameAsc') {
                state.data = state.data.sort((a, b) => a.name.localeCompare(b.name));
            } else if (dropdown === 'nameDesc') {
                state.data = state.data.sort((a, b) => b.name.localeCompare(a.name));
            } else if (dropdown === 'ageAsc') {
                state.data = state.data.sort((a, b) => a.age - b.age);
            } else if (dropdown === 'ageDesc') {
                state.data = state.data.sort((a, b) => b.age - a.age);
            } 
        },
        resetMatch: (state) => {
            state.match = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDogBreeds.fulfilled, (state, action) => {
                state.breeds = action.payload;
            })
            .addCase(fetchDogs.fulfilled, (state, action) => {
                state.dogs = action.payload;
            }) 
            .addCase(fetchDogData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(createMatch.fulfilled, (state, action) => {
                state.match = action.payload;
            })
    }
});

export const selectDogBreeds = (state) => state.dogs.breeds;
export const selectDogs = (state) => state.dogs.dogs;
export const selectDogData = (state) => state.dogs.data;
export const selectBreedSearch = (state) => state.dogs.searchState;
export const selectMatch = (state) => state.dogs.match;
export const { sortedDogs, resetMatch, breedSearch, initialSort } = dogsSlice.actions;
export default dogsSlice.reducer;