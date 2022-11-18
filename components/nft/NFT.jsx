import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import Accordion_ from "./Accordion";
import Link from "next/link";
import { useRouter } from "next/router";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../common/pinata";
import Marketplace from "../../common/Marketplace.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getNFTByNftId, updateNFTByNFTId } from "redux/actions/NFTAction";
import HighestBidModal from "./HighestBidModal";
import BuyNowModal from "./BuyNowModal";
import { publicRequest } from "utils/requestMethods";
import { addFavourite, deleteFavourite, getAllFavouritesByUserId } from "redux/actions/FavouriteAction";

const Nft = () => {
  const [message, updateMessage] = useState("");
  const [buy, setBuy] = useState(false);
  const [bid, setBid] = useState(false);
  const [nft, setNFT] = useState(false);
  const [favorite, setFavorite] = useState(false);
  //get current NFT id
  const router = useRouter();
  const nft_id = router.query.id;

  //get current user
  const user = useSelector((state) => state.user.currentUser);
  const favs = useSelector((state) => state.favourite.favourites);

  const distpatch = useDispatch();

  useEffect(() => {
    if (favs.includes(nft_id)) {
      setFavorite(true);
    }
    if (nft_id) {
      console.log(nft_id);
      publicRequest.get(`nft/${nft_id}`).then((res) => {
        setNFT(res.data);
      });
    }
    user?._id && getAllFavouritesByUserId(distpatch, user?._id);
  }, [distpatch, nft_id]);

  //get relevent nft by NFT array
  //const nft = useSelector((state) => state.NFT.NFT);

  const [list, setList] = useState(null);
  if (!nft) {
    return <p>not found</p>;
  }
  //  if (nft_id) {
  //   publicRequest.get(`nft/${nft_id}`).then((res) => {
  //     // console.log(res.data);
  //   });
  // }
  //get list details
  async function getListingDetails() {
    // console.log(`/auction/nft/${nft_id}`);
    let listing = (await publicRequest.get(`listing/${nft_id}`)).data;
    if (!listing) {
      listing = (await publicRequest.get(`auction/nft/${nft_id}`)).data;
      console.log(listing);
      listing = { ...listing[0], type: "auction" };
    } else {
      listing = { ...listing[0], type: "listing" };
    }
    setList(listing);
  }
  if (nft.isListed && !list) {
    getListingDetails();
  }

  //console.log(nft);
  //console.log(user);

  //nft blockchain part++++++++++++++++

  //This function uploads the metadata to IPDS
  async function uploadMetadataToIPFS() {
    const nftJSON = {
      name: nft.NFTName,
      description: nft.description,
      image: nft.pinataurl,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }
  function getCurrentPriceForDecreasingAuction() {
    const currentDate = new Date();
    const startDate = new Date(list.startDate);
    const endtDate = new Date(list.endDate);
    const durationHours =
      (endtDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;
    const currentDurationHours = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60
    );
    const startPrice = list.startPrice;
    const endPrice = list.endPrice;

    const price = +(
      startPrice -
      (startPrice - endPrice) * (currentDurationHours / durationHours)
    ).toFixed(8);
    console.log(price);
    return price;
  }

  async function listNFT() {
    //Upload data to IPFS
    try {
      const ethers = require("ethers");

      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits("0.01", "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT

      let transaction = await contract.createToken(
        metadataURL,
        price,
        nft.owner,
        {
          value: price,
        }
      );

      await transaction.wait();

      let tid = await contract.getCurrentToken();

      //console.log(tid);
      //console.log(transaction)
      const newnft = {
        mint: true,
        tokenId: tid._hex,
        isListed: false,
        owner: user.walletAdress,
      };
      updateNFTByNFTId(distpatch, newnft, nft._id);

      alert("Successfully minted your NFT!");

      //window.location.replace("/")
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function buyNFT() {
    const tokenId = hexToDecimal(nft.tokenId);
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
      const salePrice = ethers.utils.parseUnits("0.025", "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      //let owner = await contract.withdraw()
      // console.log(owner)
      let ns = await contract.getAllNFTs();
      console.log(ns);
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      const newnft = { isListed: false, owner: user.walletAdress };
      updateNFTByNFTId(distpatch, newnft, nft._id);
      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  async function executebuyNFT(e) {
    e.preventDefault();
    //setBuy(true);
    if (nft.mint == true) {
      console.log("buy");
      await buyNFT();
    } else {
      console.log("mint");
      await listNFT();
    }
  }

  async function executeBidNFT(e) {
    e.preventDefault();
    setBid(true);
  }
  //console.log(buy)
  //end of the nft blockchain ++++++++++++++++++++++


  //add favourite

  const handleFavorite = () => {
    if (!favorite) {
      setFavorite(true);
      const newFav = {
        owner: user._id,
        nftId: nft_id,
        nft: nft_id,
      };
      addFavourite(distpatch, newFav);
    } else {
      setFavorite(false);
      deleteFavourite(distpatch, user._id, nft_id);
    }
  };

  return (
    <div>
      <div className="container px-2 py-2 mx-auto lg:pt-12 lg:px-2">
        <div className="grid grid-cols-1  md:grid-cols-3">
          <div className="items-center">
            <div className="max-w-sm  m-4 bg-zinc-200 rounded-lg border border-gray-200 hover:shadow-lg transition ease-in-out  hover:-translate-y-1 hover:scale-110 ">
              <a href="#">
                <div className="w-full aspect-square ">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src={nft.Img}
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="col-span-2 m-4">
            <div className="mb-2 mx-2">
              <p className=" text-2xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">
                {/* Collection Name */}
                Cryptopuppies
              </p>
            </div>

            <div className="mx-2 mt-5 ">
              <p className="text-5xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">
                {/* NFT Name */}
                {nft.NFTName}
              </p>
            </div>

            <div className="flex flex-auto mx-2 mt-5 content-center ">
              <div className="basis-1/2 items-center m-1">
                <p className="text-xl  font-mono tracking-tight text-slate-500 dark:text-white">
                  {/* Owners Name */}
                  Owned by {nft.owner == user?.walletAdress ? "you" : nft.owner}
                </p>
              </div>

              <div className="basis-1/2 mx-2 ">
                {/* Like Button */}
                <button onClick={handleFavorite}>
                  {favorite && <BsSuitHeartFill size={28} />}
                  {!favorite && <BsSuitHeart size={28} />}
                </button>
              </div>
            </div>
            {/* If it is a bidding buy now should be bid now */}
            <div className="mx-2 mt-5 ">
              <p className="text-xl font-mono tracking-tight text-zinc-400 dark:text-white">
                {/* NFT Name */}
                {nft.price}
              </p>
            </div>
            <div className="flex flex-auto mx-2 mt-5 content-center ">

              <div className="basis-1/2 items-center m-1">
                {nft.owner == user?.walletAdress ? (
                  list ? (
                    list.type == "auction" ? (
                      //table for aution details TODO
                      <table className="table-auto flex">
                        <thead>
                          <tr className="flex flex-col">
                            <th className="px-4 py-2">Auction Type</th>
                            <th className="px-4 py-2">Start Price</th>
                            {list.auctionType == "Decreasing" ? (
                              <th className="px-4 py-2">End Price</th>
                            ) : null}
                            {list.auctionType == "Highest" &&
                              list.winningBid ? (
                              <th className="px-4 py-2">Current max Bid</th>
                            ) : null}
                            <th className="px-4 py-2">Start Date</th>
                            <th className="px-4 py-2">End Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="flex flex-col">
                            <td className="border px-4 py-2">
                              {list.auctionType}
                            </td>
                            <td className="border px-4 py-2">
                              {list.startingPrice}
                            </td>
                            {list.auctionType == "Decreasing" ? (
                              <td className="border px-4 py-2">
                                {list.endingPrice}
                              </td>
                            ) : null}
                            {list.auctionType == "Highest" &&
                              list.winningBid ? (
                              <td className="border px-4 py-2">
                                {list.winningBid.value}
                              </td>
                            ) : null}
                            <td className="border px-4 py-2">
                              {list.startDate}
                            </td>
                            <td className="border px-4 py-2">{list.endDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p>li</p>
                    ) //TODO direct sell details view
                  ) : (
                    <Link href={`/nft/${nft._id}/list`}>
                      <button className="px-4 py-2 font-semibold text-white bg-zinc-400 rounded-lg shadow-md hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-75">
                        List NFT
                      </button>
                    </Link>
                  )
                ) : list ? (
                  list.type == "auction" ? (
                    <>
                      <table className="table-auto flex">
                        <thead>
                          <tr className="flex flex-col">
                            <th className="px-4 py-2">Auction Type</th>
                            <th className="px-4 py-2">Start Price</th>
                            {list.auctionType == "Decreasing" ? (
                              <th className="px-4 py-2">End Price</th>
                            ) : null}
                            {list.auctionType == "Decreasing" ? (
                              <th className="px-4 py-2">Current Price</th>
                            ) : null}
                            <th className="px-4 py-2">Start Date</th>
                            <th className="px-4 py-2">End Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="flex flex-col">
                            <td className="border px-4 py-2">
                              {list.auctionType}
                            </td>
                            <td className="border px-4 py-2">
                              {list.startingPrice}
                            </td>
                            {list.auctionType == "Decreasing" ? (
                              <td className="border px-4 py-2">
                                {list.endingPrice}
                              </td>
                            ) : null}
                            {list.auctionType == "Decreasing" ? (
                              <td className="border px-4 py-2">
                                {getCurrentPriceForDecreasingAuction()}
                              </td>
                            ) : null}
                            <td className="border px-4 py-2">
                              {list.startDate}
                            </td>
                            <td className="border px-4 py-2">{list.endDate}</td>
                          </tr>
                        </tbody>
                      </table>
                      {list.auctionType == "Decreasing" ? (
                        //TODO dec bidding should call buyfunction with current price
                        <button
                          type="button"
                          onClick={() => {
                            setBuy(true);
                          }}
                          className="break-inside bg-green-600 rounded-full px-8 py-4 mb-4 w-full hover:bg-green-700 transition ease-in-out duration-150"
                        >
                          {buy && (
                            <div>
                              <BuyNowModal
                                executebuyNFT={executebuyNFT}
                                setBuy={setBuy}
                                buy={buy}
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between flex-1">
                            <span className="text-lg font-medium text-white">
                              Buy Now
                            </span>
                          </div>
                        </button>
                      ) : list.status == "Bidding" ? (
                        <>
                          <button
                            type="button"
                            onClick={executeBidNFT}
                            className="break-inside bg-green-600 rounded-full px-8 py-4 mb-4 w-full hover:bg-green-700 transition ease-in-out duration-150"
                          >
                            <div className="flex items-center justify-between flex-1">
                              <span className="text-lg font-medium text-white">
                                Bid Now
                              </span>
                            </div>
                          </button>
                          {bid && (
                            <div>
                              <HighestBidModal
                                closeBidNFT={setBid}
                                auction={list}
                              />
                            </div>
                          )}
                        </>
                      ) : list.status == "Pending" &&
                        list.winningBid.bidder == user.walletAdress ? (
                        //TODO call buy function with winning bid
                        <>
                          <button
                            type="button"
                            className="break-inside bg-green-600 rounded-full px-8 py-4 mb-4 w-full hover:bg-green-700 transition ease-in-out duration-150"
                          >
                            Buy Win NFT
                          </button>
                        </>
                      ) : (
                        <p>Auction Ended</p>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={executebuyNFT}
                      className="break-inside bg-green-600 rounded-full px-8 py-4 mb-4 w-full hover:bg-green-700 transition ease-in-out duration-150"
                    >
                      {buy && (
                        <div>
                          <BuyNowModal />
                        </div>
                      )}
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-lg font-medium text-white">
                          Buy Now
                        </span>
                      </div>
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Accordion_ />
      </div>
    </div>
  );
};

export default Nft;
