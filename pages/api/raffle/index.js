

import NFT from "models/NFT";
import Raffle from "models/Raffle";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const raffles = await NFT.find({ isListed: true, listType:"raffle"});
			res.status(200).json(raffles);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			console.log(req.body);
			const newraffle = new Raffle(req.body);
			const raffle = await newraffle.save();
			await NFT.findByIdAndUpdate(req.body.nft, { isListed: true, listType:"raffle",listId:raffle._id})
			res.status(201).json(raffle);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
