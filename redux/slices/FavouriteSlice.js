import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
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
  },
});

// Action creators are generated for each case reducer function
export const {
  getfavouritesSuccess,
  addfavouriteSuccess,
  removefavouriteSuccess,
} = FavouriteSlice.actions;


export default FavouriteSlice.reducer;
