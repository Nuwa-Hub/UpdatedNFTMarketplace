import React from "react";
import { useEffect, useState } from "react";
import { publicRequest } from "utils/requestMethods";
// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Link from "next/link";

export default function ActionTable({ color }) {
  const [isLoading, setLoading] = useState(false);
  const tableHeaderHigh = [
    "NFT Name",
    "Owner",
    "Start Price",
    "Winning Bid",
    "Start Date",
    "End Date",
    "Status",
    "Block",
  ];
  const tableHeaderDec = [
    "NFT Name",
    "Owner",
    "Start Price",
    "End Price",
    "Start Date",
    "End Date",
    "Status",
    "Block",
  ];
  const [auctions, setAuctions] = useState([]);

  function getAuctions() {
    setLoading(true);
    publicRequest
      .get("admin/auction")
      .then((res) => {
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAuctions();
  }, []);
  function blockUnBlockHandler(auction) {
    publicRequest
      .put(`admin/auction/${auction._id}`, { access: !auction.access })
      .then((res) => {
        getAuctions();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (isLoading) return <p>Loading...</p>;
  if (!auctions) return <p>No Auction Data</p>;
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-slate-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-slate-700" : "text-white")
                }
              >
                Highest Bid Auctions
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {tableHeaderHigh.map((header) => {
                  return (
                    <th
                      key={header}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-slate-50 text-slate-500 border-slate-100"
                          : "bg-slate-600 text-slate-200 border-slate-500")
                      }
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => {
                if (auction.auctionType === "Highest")
                  return (
                    <tr key={auction._id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Link href={`/nft/${auction.nft._id}`}>
                          <a>{auction.nft.NFTName}</a>
                        </Link>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.owner.substring(0, 8) + "..."}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.startingPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.winningBid
                          ? auction.winningBid.value
                          : "No bids"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(auction.startDate).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(auction.endDate).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <button
                          className="bg-slate-200 text-slate-500 active:bg-slate-600 font-bold uppercase text-xs px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => blockUnBlockHandler(auction)}
                        >
                          {auction.access ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Decreasing Bid Auctions
                </h3>
              </div>
            </div>
          </div>
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {tableHeaderDec.map((header) => {
                  return (
                    <th
                      key={header}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-slate-50 text-slate-500 border-slate-100"
                          : "bg-slate-600 text-slate-200 border-slate-500")
                      }
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => {
                if (auction.auctionType === "Decreasing")
                  return (
                    <tr key={auction._id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Link href={`/nft/${auction.nft._id}`}>
                          <a>{auction.nft.NFTName}</a>
                        </Link>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.owner.substring(0, 8) + "..."}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.startPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.endPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(auction.startDate).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(auction.endDate).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {auction.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <button
                          className="bg-slate-200 text-slate-500 active:bg-slate-600 font-bold uppercase text-xs px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => blockUnBlockHandler(auction)}
                        >
                          {auction.access ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
