import { createSlice } from "@reduxjs/toolkit";

const filterAssetsSlice = createSlice({
    name : "filterAssets",
    initialState : {
        filterAssets : [],
    },
    reducers : {
        setfilterAssets:(state, action)=>{
            state.filterAssets.push(action.payload)
        },
        logOut:(state, action)=>{
            state.filterAssets = []
        },
    }
});

export const setfilterAssets1 = filterAssetsSlice.actions.setfilterAssets;
export const logOut1 = filterAssetsSlice.actions.logOut;
export default filterAssetsSlice.reducer; 