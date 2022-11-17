import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Marketplace from "../../common/Marketplace.json";
import { publicRequest } from "utils/requestMethods";

const RaffleCard = ({ nft }) => {
  //console.log(user)
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();



  //add bid
  const addRafbid = async () => {
    
    try {
      await bidforRaffle()
      const newbid = { raffleId: nft.listId, bidder: user?.walletAdress, };
      console.log("dfs")
      const res = await publicRequest.post(`/rafbid`, newbid);

      console.log(res.data);
    } catch (err) {console.log(err)}
  };

  async function bidforRaffle() {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      const rafflebid = ethers.utils.parseUnits("0.01", "ether");

      //run the executeSale function
      //let ns = await contract.getAllNFTs()
      //console.log(ns)
      let transaction = await contract.rafflebid(nft.owner, {
        value: rafflebid,
      });
      await transaction.wait();

      // const newnft = { isListed: false, owner: user.walletAdress };
      // updateNFTByUserId(distpatch, newnft, nft._id);
      alert("You successfully Bid for the NFT!");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  return (
    <div className="nft">
      <div className="main flex flex-col p-4 w-full">
        <img
          className="tokenImage rounded-lg h-64 max-w-full object-cover"
          src={nft.Img}
          alt="NFT"
        />
        <h2>{nft.NFTName}</h2>
        <div className="tokenInfo flex items-center justify-between">
          <div className="price">
            <ins>$</ins>
            <p>10 ETH</p>
          </div>
          <div className="duration">
            <ins>Rarity:</ins>
            <p style={{ color: "orange" }}>LEGENDARY</p>
          </div>
        </div>
        <div>
          <p style={{ margin: "10px 0px" }}>
            Description: <span>{nft.description}</span>{" "}
          </p>
        </div>
        <div></div>
        <hr />
        <div className="creator">
          <p style={{ width: "50%" }}>
            <ins>Supply:</ins> 666
          </p>
          <button
            type="button"
            className=" btn-primary"
            style={{
              width: "50%",
              padding: "10px",
              fontSize: "15px",
              background:
                "linear-gradient(0deg, #282c34 0%, rgba(17, 0, 32, 0.5) 100%)",
              border: "1px solid #383838",
              color: "#ee83e5",
              fontWeight: "800",
            }}
            onClick={() => {
              addRafbid();
            }}
          >
            Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaffleCard;
