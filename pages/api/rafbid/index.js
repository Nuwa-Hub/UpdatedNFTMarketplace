import Bid from "models/Bid";
import Auction from "models/Auction";
import connectDB from "utils/connectDB";
import RaffleBid from "models/RaffleBid";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const biddings = await RaffleBid.find();
			res.status(200).json(biddings);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			const newBid = new RaffleBid(req.body);
			const bid = await newBid.save();
			res.status(201).json(bid);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	if (method === "DELETE") {
		// console.log(req.body)
		try {
			await Bid.remove();
			res.status(201).json({ message: "All Bids Deleted" });
		} catch (err) {
			res.status(500).json(err);
			console.log(err);
		}
	}
}
