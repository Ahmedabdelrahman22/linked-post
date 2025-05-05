import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { postsReducer } from "./slices/postsSlice";

export let store = configureStore({
    reducer:{
        userReducer,
        postsReducer
    }
})

export type storeDispatch =  typeof store.dispatch

export type storeState =  ReturnType<typeof store.getState>