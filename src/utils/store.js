import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import tooglerReducer from './tooglerSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        toogler: tooglerReducer
    }
})
export default store;