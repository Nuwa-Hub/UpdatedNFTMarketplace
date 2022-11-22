import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Collectioncard = ({ collection, user }) => {
  // console.log(collection);
  const getBalance = async () => {
    if (window.ethereum) {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = res[0];
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
    }
  };
  const { currentUser, userToken } = useSelector((state) => state.user);
  return (
    <Link
      href={
		if (currentUser && currentUser.access) {
        user
          ? `/collection/user/${collection._id}`
          : `/collection/${collection._id}`
      }
	  else{
		getBalance();
	  }}
    >
      <div className="nft ">
        <div className="main flex flex-col p-4 w-full">
          <img
            className="tokenImage rounded-lg h-64 max-w-full object-cover"
            src={collection.bannerImg}
            alt="NFT"
          />

          <div className="tokenInfo flex items-center justify-between">
            <div className="price">
              <p className="flex items-center font-bold text-2xl">
                {collection.collectionName}
              </p>
            </div>
            <div className="duration absolute right-10 bottom-5 ">
              <img
                className="tokenImage rounded-lg h-24 w-24 max-w-full object-cover relative ring-8 ring-neutral-50"
                src={collection.profileImg}
                alt="NFT"
              />
            </div>
          </div>
          {/* <div className="creator">
						<p>Supply:</p> 6
					</div> */}
        </div>
      </div>
    </Link>
  );
};

export default Collectioncard;
