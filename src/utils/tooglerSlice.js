import { createSlice } from "@reduxjs/toolkit";
const tooglerSlice = createSlice({
    name: "toogler",
    initialState: {
        show: false
    },
    reducers: {
        openSidebar: (state) => {
            state.show = true;
        },
        closeSidebar: (state) => {
            state.show = false
        }
    }
})

export const { openSidebar, closeSidebar } = tooglerSlice.actions;
export default tooglerSlice.reducer