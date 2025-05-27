import { createSlice } from "@reduxjs/toolkit";


const User = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: User || null ,
    loading: false,
    error: null
};


const authSlice = createSlice ({
    name: "auth" ,
    initialState,
    reducers: {

        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
    }
})


export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;