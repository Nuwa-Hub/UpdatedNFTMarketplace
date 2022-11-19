import Auction from "models/Auction";
import NFT from "models/NFT";
import Bid from "models/Bid";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { auction_id } = req.query;

	await connectDB();

	//get method for rendering data
	if (req.method === "GET") {
		try {
			const auction = await Auction.findById(auction_id).populate("nft").populate("winningBid").populate("bid");
			res.status(200).json(auction);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (req.method === "PUT") {
		try {
			const updateAuction = await Auction.findByIdAndUpdate(
				auction_id,
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updateAuction);
		} catch (err) {
			console.log("err")
			res.status(500).json(err);
		}
	}

	if (req.method === "DELETE") {
		try {
			const deleteAuction = await Auction.findByIdAndDelete(auction_id);
			res.status(200).json(deleteAuction);
		} catch (err) {
			console.log("err")
			res.status(500).json(err);
		}
	}
}
