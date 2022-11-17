import {
  addfavouriteSuccess,
  getfavouritesSuccess,
  removefavouriteSuccess,
} from "redux/slices/FavouriteSlice";

import { publicRequest, userRequest } from "/utils/requestMethods";

//add NFT
export const addFavourite = async (dispatch, favourite) => {
  try {
    const res = await publicRequest.post(`/favourite`, favourite);
    //console.log(res.data);
    dispatch(addfavouriteSuccess(res.data));
  } catch (err) {}
};

//delete NFT
export const deleteFavourite = async (dispatch, userId, nftId) => {
  try {
    const res = await publicRequest.delete(
      `/favourite/delete/${nftId}/${userId}/`
    );
    dispatch(removefavouriteSuccess(userId));
    console.log(res.data);
  } catch (err) {}
};
//get all NFT
export const getAllFavouritesByUserId = async (dispatch, userId) => {
  try {
    const res = await publicRequest.get(`/favourite/${userId}`);
    dispatch(getfavouritesSuccess(res.data));
  } catch (err) {}
};
