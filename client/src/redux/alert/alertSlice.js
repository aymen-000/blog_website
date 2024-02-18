import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show : false
}
const alertSlice =createSlice({
    name : "alert", 
    initialState  , 
    reducers : {
        toggleAlert : (state , action ) => {
            state.show = action.payload
        }
    }
})
export const {toggleAlert} = alertSlice.actions 
export default alertSlice.reducer ;