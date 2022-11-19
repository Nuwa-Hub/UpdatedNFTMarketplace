import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { updateNFTByNFTId } from "redux/actions/NFTAction";
import Marketplace from "../../common/Marketplace.json";

const Message = ({ notification }) => {
    const distpatch = useDispatch();
    const nft = notification.nft
    const user = useSelector((state) => state.user.currentUser);
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
            const salePrice = ethers.utils.parseUnits("0.05", "ether");
           
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
            alert("You successfully bought the NFT!");
      
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
            await mintNFT();
        }
    }
    //end











    //console.log(nft)
    return <div className="h-auto relative w-full sm:w-1/2 md:w-1/2 lg:w-1/2 mt-4 ">
        <div className="bg-white  px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
            <div className="w-full flex items-center justify-between">
                <span className="font-large text-[25px] text-slate-400">You Win!!!</span>
                <button className="-mr-1 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 h-5 w-5 rounded-full flex justify-center items-center">
                    <svg className="h-2 w-2 fill-current items-center" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
                </button>
            </div>
            <div className="flex items-center justify-evenly mt-2 rounded-lg px-1 py-1 cursor-pointer">
                <div className="relative flex flex-shrink-0 items-end">

                    <img className="h-16 w-16 rounded-full" src={nft.Img} />
                    <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
                </div>
                <div className="ml-3 flex flex-col items-start justify-start">
                    <span className="font-semibold tracking-tight text-[20px]">{nft.name}</span>
                    <span className="text-xs leading-none opacity-50 ml-1">You already win this NFT please accept using the blue button bellow </span>

                    <button onClick={executebuyNFT} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 w-24 h-8 mt-2 mb-2 rounded">
                        Accept NFT
                    </button>
                    <span className="text-[14px] text-blue-500 font-medium leading-4 opacity-75"> <Moment fromNow>{notification.createdDate}</Moment></span>
                </div>
            </div>
        </div>
    </div>;
};

export default Message;
