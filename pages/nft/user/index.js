import NFTCard from "components/NFTCard";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllNFTs, getNFTByUserId } from "redux/actions/NFTAction";

const exploreNFT = () => {
  const ethers = require("ethers");
  const dispatch = useDispatch();
  //get current user
  const currentUser = useSelector((state) => state.user.currentUser?.walletAdress);
  console.log(currentUser)
  useEffect(() => {
    currentUser && getNFTByUserId(dispatch, currentUser);
  }, [currentUser]);
  //if (!dataFetched)  getAllNFTs();
  const getnfts = useSelector((state) => state.NFT.userNFTs);

  //console.log(getnfts);

  return (
    <div className="overflow-hidden">
      <h1 className="text-6xl mt-3 font-mono tracking-tight text-bold dark:text-white">
        Explore NFTs
      </h1>
      <div className="overflow-hidden text-gray-700">
        <div className="px-1 py-1 mx-auto lg:pt-12 lg:px-2">
          <div className="flex flex-wrap -m-1 md:-m-2 ">
            {getnfts?.length > 0 &&
              getnfts.map((item, index) => (
                <div
                  className="flex flex-wrap w-full  sm:w-full md:w-1/2 lg:w-1/4"
                  key={index}
                >
                  <NFTCard nft={item} user="user" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default exploreNFT;
