import axios from "axios";
import {
  getCollectionFailure,
  getCollectionsFailure,
  getCollectionsSuccess,
  getCollectionSuccess,
} from "redux/slices/collectionSlice";
import { publicRequest, userRequest } from "utils/requestMethods";
//const BASE_URL = "http://localhost:3000/api/";
const BASE_URL = "https://updated-nft-marketplace.vercel.app/api/";
//add collection
export const addCollections = async (dispatch, newCollection,token) => {
  try {
  
     const userRequest = axios.create({
      baseURL: BASE_URL,
      headers: { token: `${token}` },
    });
    const res = await userRequest.post(`/collection`, newCollection);

    console.log(res.data);
  } catch (err) {
    console.log(err)
  }
};

//get all collections
export const getAllCollections = async (dispatch) => {
  try {
    const res = await publicRequest.get(`/collection`);
    console.log(res.data);
    dispatch(getCollectionsSuccess(res.data));
  } catch (err) {
    dispatch(getCollectionsFailure());
  }
};

//get all collection by id
export const getCollectionById = async (dispatch, collection_id) => {
  try {
    const res = await publicRequest.get(`/collection/${collection_id}`);
    console.log(res.data);
    dispatch(getCollectionSuccess(res.data));
  } catch (err) {
    dispatch(getCollectionFailure());
  }
};

//get all collection by user id
export const getCollectionByUserId = async (dispatch, user_wallet) => {
  try {
    console.log("sdffd");
    const res = await publicRequest.get(`/collection/user/${user_wallet}`);
    console.log(res.data);
    dispatch(getCollectionSuccess(res.data));
  } catch (err) {
    dispatch(getCollectionFailure());
  }
};

//get all collection by keyword

// export const getCollectionsByKeyword = async (dispatch, keyword) => {
// 	try {
// 		const res = await publicRequest.get(`/collection/keyword/${keyword}`);
// 		console.log(res.data);
// 		dispatch(getCollectionSuccess(res.data));
// 	} catch (err) {
// 		dispatch(getCollectionFailure());
// 	}
// };
