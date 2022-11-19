import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "utils/requestMethods";
//import { updateUserSuccess } from "redux/slices/userSlice";


export const userLogin = createAsyncThunk(
  "user/login",
  async ({ walletAdress }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/login",
        { walletAdress },
        config
      );

      // store user's token in local storage
      sessionStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateCurrentUser = createAsyncThunk(
  "user/updateUser",
  async ({ user,id }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("user",user);
      const res = await publicRequest.put(`/user/${id}`, user, config);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//update developer
// export const updateCurrentUser = async (dispatch, user, id) => {
//   try {
//     const res = await publicRequest.put(`/user/${id}`, user);
//     //console.log(res.data);
//    // dispatch(updateUserSucces(res.data));
//   } catch (err) {
//     if (error.response && error.response.data.message) {
//       return rejectWithValue(error.response.data.message);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// };
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async ({ firstName, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }

//       await axios.post(
//         '/api/user/register',
//         { firstName, email, password },
//         config
//       )
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(`/api/auth/profile`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
