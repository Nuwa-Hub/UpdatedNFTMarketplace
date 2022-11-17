import { createSlice } from "@reduxjs/toolkit";
import { registerAdmin, getAdminDetails, adminLogin, getAdminData } from "redux/actions/adminAction";

// let adminToken = null
// if (typeof window !== "undefined") {
//     adminToken = sessionStorage.getItem("adminToken");
// }
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        currentAdmin: null,
        adminToken: null,
        pending: false,
        error: null,
        data: null,
    },
    reducers: {
        adminLogout: (state) => {
            sessionStorage.removeItem("adminToken");
            state.currentAdmin = null;
            state.adminToken = null;
        },
    },
    extraReducers: {
        // [userLogin.fulfilled]: (state, action) => {
        //     state.currentUser = action.payload.user;
        //     state.userToken = action.payload.userToken;
        // },
        [getAdminData.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [getAdminDetails.fulfilled]: (state, action) => {
            state.currentAdmin = action.payload.admin;
        },
        [registerAdmin.fulfilled]: (state, action) => {
            // state.currentAdmin = action.payload.admin;
            // state.adminToken = action.payload.adminToken;
        },
        [adminLogin.rejected]: (state, action) => {
            state.error = action.payload;
            state.pending = false;
        },
        [adminLogin.pending]: (state, action) => {
            state.pending = true;
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.pending = false;
            state.currentAdmin = action.payload.admin;
            state.adminToken = action.payload.adminToken;
        },
    }
});

export const {
    adminLogout
} = adminSlice.actions;
export default adminSlice.reducer;
