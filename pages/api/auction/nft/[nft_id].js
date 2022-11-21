import Auction from "models/Auction";
import Bid from "models/Bid";
import connectDB from "utils/connectDB";
const mongoose = require("mongoose");

export default async function handler(req, res) {
    const { nft_id } = req.query;

    await connectDB();

    //get method for rendering data
    if (req.method === "GET") {
        try {
            const auction = await Auction.findOne({ nft: new mongoose.Types.ObjectId(nft_id), $or: [{ 'status': "Bidding" }, { 'status': 'Pending' }] }).sort({ createdAt: -1 }).populate("nft").populate("winningBid").populate("bid");
            res.status(200).json(auction);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }

    // if (req.method === "PUT") {
    // 	try {
    // 		const updateAuction = await Auction.findByIdAndUpdate(
    // 			auction_id,
    // 			{ $set: req.body },
    // 			{ new: true }
    // 		);
    // 		res.status(200).json(updateAuction);
    // 	} catch (err) {
    // 		console.log("err")
    // 		res.status(500).json(err);
    // 	}
    // }

    // if (req.method === "DELETE") {
    // 	try {
    // 		const deleteAuction = await Auction.findByIdAndDelete(auction_id);
    // 		res.status(200).json(deleteAuction);
    // 	} catch (err) {
    // 		console.log("err")
    // 		res.status(500).json(err);
    // 	}
    // }
}
