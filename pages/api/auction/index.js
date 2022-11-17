import Auction from "models/Auction";
import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const auctions = await Auction.find().populate("nft").populate("winningBid").populate("bid");
			res.status(200).json(auctions);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			console.log(req.body);
			const newAuction = new Auction(req.body);
			const auction = await newAuction.save();
			await NFT.findByIdAndUpdate(req.body.nft, { isListed: true })
			res.status(201).json(auction);
		} catch (err) {
			res.status(500).json(err);
			console.log(err);
		}
	}
}
