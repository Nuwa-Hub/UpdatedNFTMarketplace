import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { publicRequest, userRequest } from "utils/requestMethods";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Marketplace from "../../common/Marketplace.json";
import { useState } from "react";

const FixedPriceForm = ({ nft }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [price, setPrice] = useState(0);
  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: Yup.object({
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
    }),
  });

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function listingNFT() {
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
      const salePrice = ethers.utils.parseUnits("0.001", "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();
      //run the executeSale function
      //let ns = await contract.getAllNFTs()
      //console.log(ns)
      let transaction = await contract.createLisToken(tokenId, salePrice, {
        value: listingPrice,
      });
      await transaction.wait();

      // const newnft = { isListed: false, owner: user.walletAdress };
      // updateNFTByUserId(distpatch, newnft, nft._id);
      alert("You successfully list the NFT!");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  async function handleSubmited(e) {
    e.preventDefault();

    if (nft.mint == true) {
      console.log("list");
      await listingNFT();

      const values = {
        price: price,
        nft: router.query.id,
        seller: user.currentUser.walletAdress,
      };
      console.log(values);
      publicRequest
        .post("listing", values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("mint");
      const values = {
        price: price,
        nft: router.query.id,
        seller: user.currentUser.walletAdress,
      };
      console.log(values);
      publicRequest
        .post("listing", values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(values);
    }
  }
  return (
    <form onSubmit={formik.handleSubmited}>
      <div className="text-xl mx-2 font-mono tracking-tight text-bold dark:text-white">
        Price
      </div>
      <div className="flex flex-auto mx-2 mt-5 content-center ">
        <div className="basis-1/2 items-center mx-4 ">
          <div className="w-full h-20 flex justify-aroundr items-center transform   rounded-lg shadow-sm shadow-cyan-500/50">
            <div className="m-5">
              <Image src="/icon-192x192.png" alt="me" width="30" height="30" />
            </div>

            <p className="text-xl ml-20 font-mono tracking-tight text-slate-500 dark:text-white">
              ETH
            </p>
          </div>
        </div>

        <div className="basis-1/2 items-center mx-4">
          <div className="w-full h-20 flex justify-center items-center rounded-lg shadow-sm shadow-cyan-500/50">
            <input
              className="w-full h-20  p-4 border-0"
              type="number"
              name="price"
              id="price"
              placeholder="Amount"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          {formik.touched.price && formik.errors.price ? (
            <p className="text-red-600">{formik.errors.price}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-auto mx-2 mt-5 content-center ">
        <div className="basis-1/2 items-center m-1">
          <button
            onClick={handleSubmited}
            className="break-inside bg-green-600 rounded-full px-8 py-4 mb-4 w-full hover:bg-green-700 transition ease-in-out duration-150"
          >
            <div className="flex items-center justify-between flex-1">
              <span type="submit" className="text-lg font-medium text-white">
                Complete Listing
              </span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default FixedPriceForm;
