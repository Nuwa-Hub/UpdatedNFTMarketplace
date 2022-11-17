import Link from "next/link";
import React from "react";

const Collectioncard = ({ collection, user }) => {
	// console.log(collection);
	return (
		<Link
			href={
				user
					? `/collection/user/${collection._id}`
					: `/collection/${collection._id}`
			}
		>
			<div className="nft ">
				<div className="main flex flex-col p-4 w-full">
					<img
						className="tokenImage rounded-lg h-64 max-w-full object-cover"
						src={collection.bannerImg}
						alt="NFT"
					/>

					<div className="tokenInfo flex items-center justify-between">
						<div className="price">
							<p className="flex items-center font-bold text-2xl">
								{collection.collectionName}
							</p>
						</div>
						<div className="duration absolute right-10 bottom-5 ">
							<img
								className="tokenImage rounded-lg h-24 w-24 max-w-full object-cover relative ring-8 ring-neutral-50"
								src={collection.profileImg}
								alt="NFT"
							/>
						</div>
					</div>
					{/* <div className="creator">
						<p>Supply:</p> 6
					</div> */}
				</div>
			</div>
		</Link>
	);
};

export default Collectioncard;
