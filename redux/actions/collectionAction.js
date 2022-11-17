import {
	getCollectionFailure,
	getCollectionsFailure,
	getCollectionsSuccess,
	getCollectionSuccess,
} from "redux/slices/collectionSlice";
import { publicRequest, userRequest } from "utils/requestMethods";

//add collection
export const addCollections = async (dispatch, newCollection) => {
	try {
		const res = await publicRequest.post(`/collection`, newCollection);

		console.log(res.data);
	} catch (err) {}
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
