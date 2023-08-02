import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
    },
    reducers : {
        setUsers:(state, action)=>{
            state.users.push(action.payload.users)
        },
        updateUser:(state, action)=>{
            const index = state.users.findIndex(user => user._id === action.payload.id);
            state.users[index] = action.payload.users;
        },
        DeleteUser:(state, action)=>{
            const index = state.users.findIndex(user => user._id === action.payload.id);
            state.users.splice(index, 1);
        },
    }
});

export const setUsers1 = usersSlice.actions.setUsers;
export const updateUser1 = usersSlice.actions.updateUser;
export const DeleteUser1 = usersSlice.actions.DeleteUser;
export default usersSlice.reducer; 