import React, { useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "redux/actions/FavouriteAction";
import { updateNFTByNFTId } from "redux/actions/NFTAction";
import Marketplace from "../../common/Marketplace.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
//select options
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Message = ({ notification }) => {
  const [loading, setloading] = useState(false);
  const distpatch = useDispatch();
  const nft = notification.nft;
  const user = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  //this is for notify messages
  function notify(msg) {
    toast(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  //blockchain part
  async function mintNFT() {
    //Upload data to IPFS
    try {
      const ethers = require("ethers");

      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

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
      deleteNotification(distpatch, notification._id);
      setloading(false);
      notify("Get NFT successfully!");

      setTimeout(() => {
        router.push({
          pathname: "/nft/user",
        });
      }, "3000");
      // alert("Successfully minted your NFT!");

      //window.location.replace("/")
    } catch (e) {
      //  alert("Upload error" + e);
      notify("something went wrong!");
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
      const salePrice = ethers.utils.parseUnits("0.06", "ether");

      //run the executeSale function
      //let owner = await contract.withdraw()
      // console.log(owner)
      //let ns = await contract.getAllNFTs();
      //console.log(ns);
      let transaction = await contract.executeWin(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      const newnft = { isListed: false, owner: user.walletAdress };
      updateNFTByNFTId(distpatch, newnft, nft._id);
      // alert("You successfully bought the NFT!");
      deleteNotification(distpatch, notification._id);

      setloading(false);
      notify("Get NFT successfully!");

      setTimeout(() => {
        router.push({
          pathname: "/nft/user",
        });
      }, "3000");
    } catch (e) {
      //  alert("Upload Error" + e);
      notify("something went wrong!");
    }
  }

  async function executebuyNFT(e) {
    setloading(true);
    e.preventDefault();
    //setBuy(true);
    if (nft.mint == true) {
      console.log("buy");
      await buyNFT();
    } else {
      console.log("mint");
      await mintNFT();
    }
  }
  //end

  //console.log(nft)
  return (
    <div className="h-auto relative w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mt-4 ">
      <ToastContainer />
      <div className="bg-white  px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
        <div className="w-full flex items-center justify-between">
          <span className="font-large text-[25px] text-slate-400">
            You Win!!! {nft.type}
          </span>
          <button className="-mr-1 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 h-5 w-5 rounded-full flex justify-center items-center">
            <svg
              className="h-2 w-2 fill-current items-center"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-evenly mt-2 rounded-lg px-1 py-1 cursor-pointer">
          <div className="relative flex flex-shrink-0 items-end">
            <img className="h-16 w-16 rounded-full" src={nft.Img} />
          </div>
          <div className="ml-3 flex flex-col items-start justify-start">
            <span className="font-semibold tracking-tight text-[20px]">
              {nft.name}
            </span>
            <span className="text-xs leading-none opacity-50 ml-1">
              You already win this NFT please accept using the blue button
              bellow{" "}
            </span>

            <button
              onClick={executebuyNFT}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 w-24 h-8 mt-2 mb-2 rounded"
            >
              Accept NFT
            </button>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <span className="text-[14px] text-blue-500 font-medium leading-4 opacity-75">
              {" "}
              <Moment fromNow>{notification.createdDate}</Moment>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
