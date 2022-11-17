import Image from "next/image";
import React, { useState } from "react";
import DecliningPriceSell from "./DecliningPriceSell";
import HighestBidderSell from "./HighestBidderSell";
const AuctionForm = ({nft}) => {
	const [highest, setHighest] = useState(null);
	return (
		<div>
			<div className="text-xl mx-2 mt-5 font-mono tracking-tight text-bold dark:text-white">
				Method
			</div>
			<div className="flex w-full mx-2 mt-5 content-center ">
				<div className="group relative mx-4">
					<div className="w-full h-20 flex justify-center items-center rounded-lg shadow-sm shadow-cyan-500/50">
						<button className="w-full bg-white text-black px-6 h-10 rounded border-none ">
							{highest === null ? 'Choose the auction method' : highest ? 'Highest Bidder' : 'Declining Price'}
						</button>
					</div>
					<div
						tabIndex="0"
						className="border-2 bg-white invisible  rounded w-60 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
					>
						<ul className="py-1 cursor-pointer">
							<li>
								<div
									className="block px-4 py-2 hover:bg-gray-100"
									onClick={() => setHighest(0)}
								>
									Declining price
								</div>
							</li>
							<li>
								<div
									className="block px-4 py-2 hover:bg-gray-100"
									onClick={() => setHighest(1)}
								>
									Highest bidder
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{highest === null ? null : highest ? <HighestBidderSell nft={nft} /> : <DecliningPriceSell nft={nft}/>}
		</div>
	);
};

export default AuctionForm;
