import Bid from "models/Bid";
import Auction from "models/Auction";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const biddings = await Bid.find();
			res.status(200).json(biddings);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			const oldBid = await Bid.findOne({ auctionId: req.body.auctionId, bidder: req.body.bidder });
			let bidCreated = null
			if (oldBid) {
				const newBid = await Bid.findOneAndUpdate(
					{ auctionId: req.body.auctionId, bidder: req.body.bidder },
					{ value: req.body.value },
					{ new: true }
				);
				bidCreated = newBid;
				await Auction.findByIdAndUpdate({ _id: req.body.auctionId }, { $set: { winningBid: oldBid._id } });
			} else {
				const newBid = new Bid(req.body);
				const bid = await newBid.save();
				await Auction.findByIdAndUpdate({ _id: req.body.auctionId }, { $set: { winningBid: bid._id }, $push: { bid: bid._id } });
				bidCreated = bid;
			}
			res.status(201).json(bidCreated);
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
