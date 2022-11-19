import User from "models/User";
import connectDB from "utils/connectDB";
const mongoose = require("mongoose");
export default async function handler(req, res) {
	const { user_id } = req.query;

	await connectDB();

	if (req.method === "PUT") {
		try {
			const updateUser = await User.findByIdAndUpdate(
				new mongoose.Types.ObjectId(user_id),
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updateUser);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}

	if (req.method === "DELETE") {
		try {
			const deleteNFT = await NFT.findByIdAndDelete(req.params.id);
			res.status(200).json(deleteNFT);
		} catch (err) {
			console.log("err");
			res.status(500).json(err);
		}
	}
}
