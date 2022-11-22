import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
  favnft:[],
  notifications:[],
  isFetching: false,
  error: false,
};

export const FavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    //GET ALL

    getfavouritesSuccess: (state, action) => {
       state.favourites = action.payload.map((fav)=>{
        return fav.nftId
     })
     state.favnft=action.payload;
    },
    getnotificationSuccess: (state, action) => {
      state.notifications = action.payload;
   },
    addfavouriteSuccess: (state, action) => {
      console.log(action.payload)
      
      state.favourites.push(action.payload.nftId);
      
    },
    removefavouriteSuccess: (state, action) => {
      state.favourites.splice(
        state.favourites.findIndex((item) => item === action.payload.nftId),
        1
      );
    },
    removenotificationSuccess: (state, action) => {
      state.notifications.splice(
        state.notifications.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removenotificationSuccess,
  getfavouritesSuccess,
  addfavouriteSuccess,
  removefavouriteSuccess,
  getnotificationSuccess,
} = FavouriteSlice.actions;


export default FavouriteSlice.reducer;
