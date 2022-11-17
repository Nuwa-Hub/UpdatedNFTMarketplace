import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NFTs: [],
  rafNft:[],
  userNfts:[],
  NFT: "",
  isFetching: false,
  error: false,
};

export const NFTSlice = createSlice({
  name: "NFT",
  initialState,
  reducers: {
    //GET ALL
    getNFTsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getNFTsSuccess: (state, action) => {
      state.isFetching = false;
      state.NFTs = action.payload;
    },
    getNFTsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getNFTSuccess: (state, action) => {
      state.isFetching = false;
      state.NFT = action.payload;
    },
    getUserNFTSuccess: (state, action) => {
      state.isFetching = false;
      state.userNFTs = action.payload;
    },
    getRafNFTSuccess: (state, action) => {
      state.isFetching = false;
      state.rafNft = action.payload;
    },
    getNFTFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateNFTSuccess: (state, action) => {
      state.isFetching = false;
      state.NFTs = action.payload;
      state.NFTs[
        state.NFTs.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getNFTsFailure,
  getNFTsSuccess,
  getNFTsStart,
  getNFTFailure,
  getNFTSuccess,
  getNFTStart,
  updateNFTSuccess,
  getRafNFTSuccess,
  getUserNFTSuccess
} = NFTSlice.actions;

export const selectValue = (state) => state.NFT.value;

export default NFTSlice.reducer;
