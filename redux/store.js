import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user";
import tokenSliceReducer from "./token";
import assetsSlicerReducer from "./assets";
import filterAssets from "./filterAssets";
import usersSlicerReducer from "./users";

export const store = configureStore({
    reducer: {
        setUser : userSliceReducer,
        settoken: tokenSliceReducer,
        setassets: assetsSlicerReducer,
        setfilterAssets: filterAssets,
        setusers: usersSlicerReducer,
    },
})