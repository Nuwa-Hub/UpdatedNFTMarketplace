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

export default function Home() {
  const { useState } = React;
  //localStorage.clear();
  
  return (
    <div className="bg-zinc-200">
      <Head>
        <title>Kryptonaut</title>
      </Head>
      {/* <Hero /> */}
      {/* <SwiperSlider />  */}
      {/* <SlideShow />  */}
      <Header />
      <GifCollection/>
      <RaffleHelper/>
      {/* <RaffleModel /> */}
      <ProductLists />
      <Trending />
      <Description />
    </div>
  );
}
