import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import tooglerReducer from './tooglerSlice'
import themeReducer from './themeSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        toogler: tooglerReducer,
        theme: themeReducer
    }
})
export default store;
