import Favourite from "models/Favourite";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { collection_id } = req.query;

	await connectDB();

	//get the favourite objects from the collection id 
	if (req.method === "GET") {
		try {
			const favos = await Favourite.find().populate({path: "nft",
			match: {
				collectionId: collection_id,
			
			}});
		
			res.status(200).json(favos);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}