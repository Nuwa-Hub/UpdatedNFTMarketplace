
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { getAllNFTs, getraffleNFT } from "redux/actions/NFTAction";
import RaffleCard from "./RaffleCard";

const RaffleModel = () => {
 
  const ethers = require("ethers");
  const dispatch=useDispatch()

 

	useEffect(() => {
		getraffleNFT(dispatch);
	}, []);
  //if (!dataFetched)  getAllNFTs();
const getnfts=useSelector((state) => state.NFT.rafNft)

//console.log(getnfts)

  return (
    <div className="overflow-hidden">
      <h1 className="text-6xl mt-3 mb-3 font-mono tracking-tight text-bold dark:text-white">
        Today Raffle 
      </h1>
      <div className="overflow-scroll scrollbar-hide text-gray-700">
        <div className="px-1 py-1 mx-auto lg:pt-12 lg:px-2">
          <div className="flex flex-wrap -m-1 md:-m-2 ">
            {getnfts?.length>0 && getnfts.map((item,index) => (
              <div
                className="flex flex-wrap w-full  sm:w-full md:w-1/2 lg:w-1/4"
                key={index}
              >
                <RaffleCard nft={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleModel;