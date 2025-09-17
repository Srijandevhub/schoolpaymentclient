import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: 'light'
    },
    reducers: {
        toogleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem("theme", state.mode);
        },
        syncTheme: (state) => {
            const mode = localStorage.getItem("theme");
            state.mode = mode;
        }
    }
})
export const { toogleTheme, syncTheme } = themeSlice.actions;
export default themeSlice.reducer