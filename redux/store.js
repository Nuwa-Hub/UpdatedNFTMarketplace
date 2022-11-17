import { combineReducers } from "@reduxjs/toolkit";
import adminSlices from "./slices/adminSlices";
import collectionSlice from "./slices/collectionSlice";
import userSlice from "./slices/userSlice";
import NFTSlice from "./slices/NFTSlice";
import FavouriteSlice from "./slices/FavouriteSlice";

import { applyMiddleware, createStore } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const rootReducer = combineReducers({
  collection: collectionSlice,
  user: userSlice,
  admin: adminSlices,
  NFT: NFTSlice,
  favourite:FavouriteSlice,
});

const masterReducer = (state, action) => {
  //console.log(action.payload);
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      collection: {
        collections: action.payload.collection.collections,
        
      },
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");

    const storage =
      typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();
    const persistConfig = {
      key: "root",
      version: 1,
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, masterReducer);
    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    );

    store.__persistor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore, {
  debug: false,
});
