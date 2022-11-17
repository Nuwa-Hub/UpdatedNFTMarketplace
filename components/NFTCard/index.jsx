import React, { useState } from "react";
import Link from "next/link";

const index = ({nft,user}) => {
  //console.log(user)
  const trailLink=""
  if (user){
     trailLink="list"
  }
  return (
    <Link href={`/nft/${nft._id}/${trailLink}`}>
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
            <p>{nft.price} ETH</p>
          </div>
          <div className="duration">
            <p>Visits - </p>
            <p style={{ color: "red" }}> {nft.visits}</p>
          </div>
        </div>
        <div>
          <p style={{ margin: "10px 0px" }}>
            owner: <span>{nft.owner.slice(0,10)}...</span>{" "}
          </p>
        </div>
        <div></div>
        <hr />
        <div className="creator">
     
          <button
            type="button"
            className="btn-primary  bg-gradient-to-r from-indigo-800 via-green-500 to-teal-20"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "15px",
              border: "1px solid #383838",
              color: "white",
              fontWeight: "800",
            }}
          >
            Click Here
          </button>
        </div>
      </div>
     
    </div>
    </Link>
  );
};

export default index;
