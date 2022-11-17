import { getNFTFailure, getNFTsFailure, getNFTsSuccess, getNFTSuccess, getRafNFTSuccess, getUserNFTSuccess, updateNFTSuccess } from "redux/slices/NFTSlice";
import { publicRequest, userRequest } from "/utils/requestMethods";

//add NFT
export const addNFTs = async (dispatch, newNFT) => {
	try {
		const res = await publicRequest.post(`/nft`, newNFT);

		console.log(res.data);
	} catch (err) { }
};

//get all NFT
export const getAllNFTs = async (dispatch) => {
	try {
		const res = await publicRequest.get(`/nft`);
		//console.log(res.data)
		dispatch(getNFTsSuccess(res.data));
	} catch (err) {
		dispatch(getNFTsFailure());
	}
};

//get  NFT by collection id
export const getNFTsByCollectionId = async (dispatch, collection_id) => {
	try {
		const res = await publicRequest.get(`/nft/collection/${collection_id}`);
		//console.log(res.data)
		dispatch(getNFTsSuccess(res.data));
	} catch (err) {
		dispatch(getNFTsFailure());
	}
};

//get  NFT by collection id
export const getUserNFTsByCollectionId = async (dispatch, collection_id) => {
	try {
		const res = await publicRequest.get(`/nft/collection/user/${collection_id}`);
		//console.log(res.data)
		dispatch(getNFTsSuccess(res.data));
	} catch (err) {
		dispatch(getNFTsFailure());
	}
};

//get  NFT by nft id
export const getNFTByNftId = async (dispatch, nft_id) => {
	try {
		const res = await publicRequest.get(`/nft/${nft_id}`);
		//console.log(res.data)
		dispatch(getNFTSuccess(res.data));
	} catch (err) {
		dispatch(getNFTFailure());
	}
};

//get  NFT by user id
export const getNFTByUserId = async (dispatch, user_id) => {
	try {
		const res = await publicRequest.get(`/nft/user/${user_id}`);
		//console.log(res.data)
		dispatch(getUserNFTSuccess(res.data));
	} catch (err) {
		dispatch(getNFTFailure());
	}
};

//get  NFT by user id
export const updateNFTByNFTId = async (dispatch,newNFT,nft_id) => {
	try {
		const res = await publicRequest.put(`/nft/user/${nft_id}`,newNFT);
		//console.log(res.data)
		dispatch(updateNFTSuccess(res.data));
	} catch (err) {
		
	}
};

//get  NFT by nft id
export const getraffleNFT = async (dispatch) => {
	try {
		const res = await publicRequest.get(`/raffle`);
		console.log(res.data)
		dispatch(getRafNFTSuccess(res.data));
	} catch (err) {
		dispatch(getNFTFailure());
	}
};
