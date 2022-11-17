import Favourite from "models/Favourite";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			const newFavourite = new Favourite(req.body);
			const fav = await newFavourite.save();
			res.status(201).json(fav);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
