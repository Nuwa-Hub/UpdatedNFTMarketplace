import Auction from "models/Auction";
import Listing from "models/Listing";
import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { nft_id } = req.query;

	await connectDB();

	//get method for rendering data
	if (req.method === "GET") {
		try {
			const nft = await NFT.findById(req.query.nft_id).populate("collectionId");
			const list=await Listing.find({nft:req.query.nft_id}).select('createdAt price');
            const auction=await Auction.find({nft:req.query.nft_id}).select('createdAt startingPrice');
            const c=auction+list
			res.status(200).json(c);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	
}