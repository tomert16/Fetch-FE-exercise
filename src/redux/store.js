import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "./dogsSlice";
import userReducer from "./usersSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        dogs: dogsReducer,
    }
});