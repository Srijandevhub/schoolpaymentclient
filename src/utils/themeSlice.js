import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: 'light'
    },
    reducers: {
        toogleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
})
export const { toogleTheme } = themeSlice.actions;
export default themeSlice.reducer