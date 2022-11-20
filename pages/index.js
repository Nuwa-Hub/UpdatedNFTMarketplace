import Head from "next/head";
import Image from "next/image";

import React from "react";

import Hero from "../components/Hero";
import SlideShow from "../components/SlideShow";

import RaffleModel from "@/components/RaffleModel";
import ProductLists from "@/components/HomePgaeHelper/ProductLists";
import Trending from "@/components/HomePgaeHelper/Trending";
import Header from "@/components/HomePgaeHelper/Header";
import Description from "@/components/HomePgaeHelper/Description";
import RaffleHelper from "@/components/HomePgaeHelper/RaffleHelper";
import GifCollection from "@/components/HomePgaeHelper/GifCollection";
import NFTVedio from "@/components/HomePgaeHelper/NFTVedio";
import MarketVedio from "@/components/HomePgaeHelper/MarketVedio";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const { useState } = React;
  //localStorage.clear();
  const currentUser = useSelector((state) => state.user?.currentUser?.access);
  console.log(currentUser)
  return (
    <div className="bg-zinc-200">
         {currentUser==false && (
        <div
          class="bg-red-100 rounded-lg py-5 px-6 flex flex-col text-base text-red-700 mb-3"
          role="alert"
        >
          Your Account is Currently Block Now! - check it out!
          <Link href="complainform/">
            <button
              type="button"
              class="inline-block w-48 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              complain
            </button>
          </Link>{" "}
        </div>
      )}
      <Head>
        <title>Kryptonaut</title>
      </Head>
 
      <Header />
      <GifCollection />
       {/* <NFTVedio/>   */}
      <RaffleHelper />
      {/* <MarketVedio/>  */}
      <ProductLists />
      <Trending />
      <Description />
    </div>
  );
}
