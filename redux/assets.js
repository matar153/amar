import { createSlice } from "@reduxjs/toolkit";

const assetsSlice = createSlice({
    name : "assets",
    initialState : {
        assets : [],
    },
    reducers : {
        setAssets:(state, action)=>{
            state.assets=action.payload
        },
        updateAsset:(state, action)=>{
            const index = state.assets.findIndex(asset => asset._id === action.payload.assets._id);
            state.assets[index] = action.payload.assets;
        },
        deleteImage:(state, action)=>{
            const index =  action.payload.index;
            const assetIndex = state.assets.findIndex(asset => asset._id === action.payload.assets._id);
            state.assets[assetIndex].image.splice(index, 1);
            
        },
        deleteContract1:(state, action)=>{
            const assetIndex = state.assets.findIndex(asset => asset._id === action.payload.assets._id);
            state.assets[assetIndex].contractImage.splice(0,state.assets[assetIndex].contractImage.length );
        },
        deleteEX:(state, action)=>{
            const index =  action.payload.index;
            const assetIndex = state.assets.findIndex(asset => asset._id === action.payload.assets._id);
            state.assets[assetIndex].furniture.splice(index, 1);
        },
        deleteAsset12:(state, action)=>{
            const index = state.assets.findIndex(asset => asset._id === action.payload.id);
            state.assets.splice(index, 1);
        },
        addAsset:(state, action)=>{
            state.assets.push(action.payload)
        },
        addEX:(state, action)=>{ 
            const asset = state.assets.find(asset => asset._id === action.payload.id);
            const index = state.assets.findIndex(asset => asset._id === action.payload.id);
            const indexEX = asset.expenses.length - 1
            const newexpenses = [...asset.expenses]
            newexpenses[indexEX] = {
                ...newexpenses[indexEX],
                exp: [...newexpenses[indexEX].exp, action.payload.newEx],
            };
            state.assets[index].expenses = newexpenses
        },
        addEX2:(state, action)=>{ 
            const asset = state.assets.find(asset => asset._id === action.payload.id);
            const index = state.assets.findIndex(asset => asset._id === action.payload.id);
            const indexEX = asset.expenses2.length - 1
            const newexpenses = [...asset.expenses2]
            newexpenses[indexEX] = {
                ...newexpenses[indexEX],
                exp: [...newexpenses[indexEX].exp, action.payload.newEx],
            };
            state.assets[index].expenses2 = newexpenses
        },
        
    }
});

export const setAssets1 = assetsSlice.actions.setAssets;
export const updateAsset1 = assetsSlice.actions.updateAsset;
export const deleteImage1 = assetsSlice.actions.deleteImage;
export const deleteContract1 = assetsSlice.actions.deleteContract1;
export const deleteEX1 = assetsSlice.actions.deleteEX;
export const deleteAsset12 = assetsSlice.actions.deleteAsset12;
export const addAsset1 = assetsSlice.actions.addAsset;
export const addEX1 = assetsSlice.actions.addEX;
export const addEX21 = assetsSlice.actions.addEX2;
export default assetsSlice.reducer; 