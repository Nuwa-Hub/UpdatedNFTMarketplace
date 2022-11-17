import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNFTsByCollectionId } from "redux/actions/NFTAction";
import { IoFilter } from "react-icons/io5";

export default function NFTCard() {
	//handle the routes
	const router = useRouter();
	const collection_id = router.query.id;
	const [filter, setFilter] = useState(false);
	const [filterData, setFilterData] = useState([]);
	const [lowToHigh, setLowToHigh] = useState(false);
	const [highToLow, setHighToLow] = useState(false);
	const [mostFavorite, setMostFavorite] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		getNFTsByCollectionId(dispatch, collection_id);
		console.log("inside useEffect");
	}, []);

	//get all NFTs that include to the relevent collection
	const nfts = useSelector((state) => state.NFT.NFTs);
	console.log("nfts", nfts);
	console.log("filtered", filterData);

	const handleFilter = (fileter_id , nfts) => {
		setFilter(true);
		if (fileter_id == 1) {
			let cpy = [...nfts];
			let sorted = cpy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
			setFilterData(sorted);
			setLowToHigh(true);
			setHighToLow(false);
			setMostFavorite(false);

			//get all NFTs that include to the relevent collection
		} else if (fileter_id == 2) {
			let cpy = [...nfts];
			let sorted = cpy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
			setFilterData(sorted);
			setHighToLow(true);
			setLowToHigh(false);
			setMostFavorite(false);
			//get all NFTs that include to the relevent collection
		} else if (fileter_id == 3) {
			setMostFavorite(true);
			//get all NFTs that include to the relevent collection
		}
	};

	return (
		<section className="overflow-hidden text-gray-700 ">
			<div class="m-10 bg-white shadow-md block">
				<div class="p-2 w-full flex">
					<div className="w-1/6 ml-12">
						<IoFilter size={30} />
					</div>
					<div className="w-full flex justify-around">
						{!lowToHigh && (
							<button
								onClick={() => handleFilter(1 , nfts)}
								class="p-1 px-4 m-0.5 hover:text-blue-800 hover:border-blue-500 text-sm font-bold border-2 text-gray-600 border-gray-300 bg-white rounded-lg"
							>
								<span class="w-full flex align-middle">
									Price low to high
								</span>
							</button>
						)}
						{lowToHigh && (
							<button
								onClick={() => {setLowToHigh(false)
								setFilter(false)}}
								class="p-1 px-2 m-0.5 text-sm font-bold border-2 text-blue-800 border-blue-500 bg-white rounded-lg"
							>
								<span class="w-full inline-flex leading-4 align-middle">
									<svg
										class="fill-current w-4 mr-2 h-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
									</svg>
									Price low to high
								</span>
							</button>
						)}
						{!highToLow && (
							<button
								onClick={() => handleFilter(2 , nfts)}
								class="p-1 px-4 m-0.5 hover:text-blue-800 hover:border-blue-500 text-sm font-bold border-2 text-gray-600 border-gray-300 bg-white rounded-lg"
							>
								<span class="w-full flex align-middle">
									Price high to low
								</span>
							</button>
						)}
						{highToLow && (
							<button
								onClick={() => {setHighToLow(false)
									setFilter(false)}}
								class="p-1 px-2 m-0.5 text-sm font-bold border-2 text-blue-800 border-blue-500 bg-white rounded-lg"
							>
								<span class="w-full inline-flex leading-4 align-middle">
									<svg
										class="fill-current w-4 mr-2 h-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
									</svg>
									Price high to low
								</span>
							</button>
						)}
						{!mostFavorite && (
							<button
								onClick={() => handleFilter(3 , nfts)}
								class="p-1 px-4 m-0.5 hover:text-blue-800 hover:border-blue-500 text-sm font-bold border-2 text-gray-600 border-gray-300 bg-white rounded-lg"
							>
								<span class="w-full flex align-middle">
									Most Favourite
								</span>
							</button>
						)}
						{mostFavorite && (
							<button
								onClick={() => setMostFavorite(false)}
								class="p-1 px-2 m-0.5 text-sm font-bold border-2 text-blue-800 border-blue-500 bg-white rounded-lg"
							>
								<span class="w-full inline-flex leading-4 align-middle">
									<svg
										class="fill-current w-4 mr-2 h-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
									</svg>
									Most Favourite
								</span>
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="container px-2 py-2 mx-auto lg:pt-12 lg:px-2">
				<div className="flex flex-wrap -m-1 md:-m-2">
					{filter && filterData.map((nft) => (
						<div
							key={nft._id}
							className="flex flex-wrap w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 "
						>
							<div className="group max-w-sm  m-4 bg-zinc-200 rounded-lg border border-gray-200  ">
								<Link href={`/nft/${nft._id}`}>
									<div className="w-full aspect-square  overflow-hidden">
										<img
											alt="gallery"
											className="block object-cover object-center w-full h-full rounded-lg hover:shadow-lg transition ease-in-out  hover:-translate-y-1 hover:scale-110"
											src={nft.Img}
										/>
									</div>
								</Link>

								<div className="px-5 pt-2">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										NFT Name
									</h5>

									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
										price
									</p>
									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 group-hover:hidden">
										Last Sale
									</p>
								</div>
								<button
									type="button"
									className="hidden flex h-10 bg-gradient-to-r from-indigo-800 via-green-500 to-teal-200  w-full rounded-none group-hover:block"
								>
									Buy Now
								</button>
							</div>
						</div>
					))}
					{! filter && nfts.map((nft) => (
						<div
							key={nft._id}
							className="flex flex-wrap w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 "
						>
							<div className="group max-w-sm  m-4 bg-zinc-200 rounded-lg border border-gray-200  ">
								<Link href={`/nft/${nft._id}`}>
									<div className="w-full aspect-square  overflow-hidden">
										<img
											alt="gallery"
											className="block object-cover object-center w-full h-full rounded-lg hover:shadow-lg transition ease-in-out  hover:-translate-y-1 hover:scale-110"
											src={nft.Img}
										/>
									</div>
								</Link>

								<div className="px-5 pt-2">
									<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
										NFT Name
									</h5>

									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
										price
									</p>
									<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 group-hover:hidden">
										Last Sale
									</p>
								</div>
								<button
									type="button"
									className="hidden flex h-10 bg-gradient-to-r from-indigo-800 via-green-500 to-teal-200  w-full rounded-none group-hover:block"
								>
									Buy Now
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
