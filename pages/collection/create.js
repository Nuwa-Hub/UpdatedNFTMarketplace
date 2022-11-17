import CreateCollection from "components/createCollection";
import React from "react";
import { useSelector } from "react-redux";
import { selectValue } from "redux/slices/collectionSlice";
import { IPFSInput, Input, Select, TextArea } from "web3uikit";

const createcollection = () => {
	
	//addCollections();
	const count =useSelector(selectValue)
	
	console.log(count)
	return (
		<div className="m-12">
			<CreateCollection/>
		</div>
	);
};

export default createcollection;
