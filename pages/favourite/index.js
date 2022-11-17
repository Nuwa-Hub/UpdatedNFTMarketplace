import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavouritesByUserId } from "redux/actions/FavouriteAction";
import NFTCard from "components/NFTCard";

const index = () => {
  const dispatch = useDispatch();
  //get current user
  const user = useSelector((state) => state.user.currentUser);
  const favs = useSelector((state) => state.favourite.favourites);

  useEffect(() => {
    user?._id && getAllFavouritesByUserId(dispatch, user?._id);
  },[user?._id]);
  //if (!dataFetched)  getAllNFTs();
  const getnft = useSelector((state) => state.NFT.NFTs);
  

// const favIds = favs.map((fav)=>{
//    return fav.nftId
// })



const getnfts = getnft.filter((nft)=>{
     return favs.includes(nft._id)
});



  return (
    <div className="overflow-hidden">
      <h1 className="text-6xl mt-3 font-mono tracking-tight text-bold dark:text-white">
        My Favourite NFTs
      </h1>
      <div className="overflow-hidden text-gray-700">
        <div className="px-1 py-1 mx-auto lg:pt-12 lg:px-2">
          <div className="flex flex-wrap -m-1 md:-m-2 ">
            {getnfts.length > 0 &&
              getnfts.map((item, index) => (
                <div
                  className="flex flex-wrap w-full  sm:w-full md:w-1/2 lg:w-1/4"
                  key={index}
                >
                  <NFTCard nft={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
