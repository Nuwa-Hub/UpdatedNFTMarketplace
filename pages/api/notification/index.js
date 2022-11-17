

import NFT from "models/NFT";
import Notification from "models/Notification";
import Raffle from "models/Raffle";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();


	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			console.log(req.body);
			const newNotify = new Notification(req.body);
			const notify = await newNotify.save();
			
			res.status(201).json(notify);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
