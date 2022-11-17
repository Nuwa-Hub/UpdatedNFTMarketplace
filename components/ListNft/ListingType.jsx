import { useState } from "react";

const ListingType = (props) => {
	return (
		<div>
			<div className="flex flex-auto mx-2 mt-5 content-center ">
				<div
					className="basis-1/2 items-center m-4"
					onClick={() => {
						props.setTimed(0);
					}}
				>
					<div className=" w-full h-20 flex justify-center items-center transform hover:scale-110 hover:bg-green-50 duration-500 ease-in-out rounded-lg shadow-md shadow-cyan-500/50">
						<p className="text-xl font-mono tracking-tight text-slate-500 dark:text-white">
							Fixed Price
						</p>
					</div>
				</div>

				<div
					className="basis-1/2 items-center m-4"
					onClick={() => {
						props.setTimed(1);
					}}
				>
					<div className="w-full h-20 flex justify-center items-center transform hover:scale-110 hover:bg-green-50 duration-500 ease-in-out rounded-lg shadow-md shadow-cyan-500/50">
						<p className="text-xl  font-mono tracking-tight text-slate-500 dark:text-white">
							Timed Auction
						</p>
					</div>
				</div>
				<div
					className="basis-1/2 items-center m-4"
					onClick={() => {
						props.setTimed(3);
					}}
				>
					<div className=" w-full h-20 flex justify-center items-center transform hover:scale-110 hover:bg-green-50 duration-500 ease-in-out rounded-lg shadow-md shadow-cyan-500/50">
						<p className="text-xl font-mono tracking-tight text-slate-500 dark:text-white">
							raffle
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingType;
