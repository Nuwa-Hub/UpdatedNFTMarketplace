import Favourite from "models/Favourite";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { collection_id } = req.query;

	await connectDB();

	//get method for rendering data
	if (req.method === "GET") {
		try {
			const favos = await Favourite.find({nft:collections_id});
		
			res.status(200).json(favos);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}