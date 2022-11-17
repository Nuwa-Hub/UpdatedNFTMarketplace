import React from "react";
import {
  CloudUploadIcon,
  DatabaseIcon,
  PaperAirplaneIcon,
  ServerIcon,
} from "@heroicons/react/solid";
import bgImg from "../assets/NFT.jpg";
import { useRouter } from "next/router";

const Hero = () => {
  function fetchedUrl() {
    return "../assets/NFT.jpg";
  }
  const router = useRouter();
  return (
    <div
      style={{ backgroundImage: `url(${bgImg.src})` }}
      name="home"
      className="w-full h-screen bg-cover flex flex-col justify-between"
    >
      <div className="grid grid-cols-3 gap-4 max-w-[1240px] m-auto">
        <div className="col-span-2 flex flex-col justify-center md:items-start w-full px-2 py-8">
          <h1 className="py-3 text-5xl md:text-7xl font-bold">
            Discover, collect, and sell extraordinary NFTs
          </h1>
          <p className="text-2xl">
            Kryptonaut is the world's first and largest NFT marketplace
          </p>
          <div className="flex md:items-start">
            <button className="py-3 px-6 mx-5 sm:w-[50%] my-4">Explore</button>
            <button
              onClick={() => router.push("/nft/create")}
              className="create py-3 px-6 mx-5 sm:w-[50%] my-4"
            >
              Create
            </button>
          </div>
        </div>
        {/* <div className='py-8 sm:w-full bottom-[5%] mx-1 md:left-1/2  bg-zinc-200 border border-slate-300 rounded-xl text-center shadow-xl'>
                    <img className='w-full' src={bgImg.src} alt="/" />
                </div> */}
        <div className="max-w-sm bg-zinc-200 border border-slate-300 rounded-xl shadow-xl">
          <a href="#">
            <img className="rounded-t-lg" src={bgImg.src} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Drippels
              </h5>
              <p>by Drippels</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
