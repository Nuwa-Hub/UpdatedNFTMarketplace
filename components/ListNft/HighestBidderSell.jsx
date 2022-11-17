import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { publicRequest, userRequest } from "utils/requestMethods";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Marketplace from "../../common/Marketplace.json";

const HighestBidderSell = ({ nft }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);

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

  const formik = useFormik({
    initialValues: {
      startingPrice: 0,
      startDate: null,
      endDate: null,
    },
    onSubmit: async (values) => {
      if (nft.mint == true) {
        console.log("list");
        await listingNFT();

        values = {
          ...values,
          nft: router.query.id,
          owner: user.currentUser.walletAdress,
          auctionType: "Highest",
        };
        publicRequest
          .post("auction", values)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(values);
      } else {
        values = {
          ...values,
          nft: router.query.id,
          owner: user.currentUser.walletAdress,
          auctionType: "Highest",
        };
        publicRequest
          .post("auction", values)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(values);
      }
    },
    validationSchema: Yup.object({
      startingPrice: Yup.number()
        .required("Starting price is required")
        .positive("Starting price must be positive"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-xl mx-2 mt-5 font-mono tracking-tight text-bold dark:text-white">
        Starting Price
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
              name="startingPrice"
              id="startingPrice"
              placeholder="Amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startingPrice}
            />
          </div>
          {formik.touched.startingPrice && formik.errors.startingPrice ? (
            <div className="text-red-500">{formik.errors.startingPrice}</div>
          ) : null}
        </div>
      </div>

      <div className="text-xl mx-2 mt-5 font-mono tracking-tight text-bold dark:text-white">
        Duration
      </div>

      <div className="flex flex-auto mx-2 mt-5 content-center ">
        <div className="basis-1/2 items-center mx-4">
          <div className="w-full h-20 flex justify-center items-center rounded-lg shadow-sm shadow-cyan-500/50">
            <input
              className="w-full h-20  p-4 border-0"
              type="date"
              name="startDate"
              id="startDate"
              placeholder="Start Date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
            />
          </div>
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className="text-red-500">{formik.errors.startDate}</div>
          ) : null}
        </div>

        <div className="basis-1/2 items-center mx-4">
          <div className="w-full h-20 flex justify-center items-center rounded-lg shadow-sm shadow-cyan-500/50">
            <input
              className="w-full h-20  p-4 border-0"
              type="date"
              name="endDate"
              id="endDate"
              placeholder="End Date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
            />
          </div>
          {formik.touched.endDate && formik.errors.endDate ? (
            <div className="text-red-500">{formik.errors.endDate}</div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-auto mx-2 mt-5 content-center ">
        <div className="basis-1/2 items-center m-1">
          <button
            type="submit"
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

export default HighestBidderSell;
