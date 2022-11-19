import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [],
  collection: [],
  isFetching: false,
  error: false,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    //GET ALL
    getCollectionsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectionsSuccess: (state, action) => {
      state.isFetching = false;
      state.collections = action.payload;
    },
    getCollectionsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //GET by id
    getCollectionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectionSuccess: (state, action) => {
      state.isFetching = false;
      state.collections = action.payload;
    },
    getCollectionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCollectionsFailure,
  getCollectionsSuccess,
  getCollectionsStart,
  getCollectionFailure,
  getCollectionSuccess,
  getCollectionStart,
} = collectionSlice.actions;



export default collectionSlice.reducer;
