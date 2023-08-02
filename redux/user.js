import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {},
    },
    reducers : {
        setUser:(state, action)=>{
            state.user = action.payload
        },
    }
});

export const setUser1 = userSlice.actions.setUser;
export default userSlice.reducer; 