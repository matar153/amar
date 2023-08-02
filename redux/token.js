import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name : "token",
    initialState : {
        token :"",
    },
    reducers : {
        settoken:(state, action)=>{
            state.token = action.payload
        },
    }
});

export const settoken1 = tokenSlice.actions.settoken;
export default tokenSlice.reducer; 