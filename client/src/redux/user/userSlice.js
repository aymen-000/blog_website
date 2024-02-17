import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser : null , 
    error : null , 
    loading : false
}
const userSlice  = createSlice({
    name: 'user' , 
    initialState , 
    reducers: {
        signInStart : (state)=>{
            state.loading =true; 
            state.error = null
        } , 
        signInSucess  :(state , action)=>{
            state.loading = false , 
            state.error = null , 
            state.currentUser = action.payload
        },
        signInFailure : (state , action )=>{
            state.loading = false , 
            state.error = action.payload
        }, 
        updateInformations : (state ,action )=>{
            state.loading = false , 
            action.error = null , 
            action.currentUser = action.payload 
        }
    }
})
export const {signInStart , signInFailure , signInSucess , updateInformations }=userSlice.actions
export default userSlice.reducer