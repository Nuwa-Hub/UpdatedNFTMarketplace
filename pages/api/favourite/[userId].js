import Favourite from "models/Favourite";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { userId } = req.query;

	await connectDB();

	//get method for rendering data
	if (req.method === "GET") {
		try {
			const favos = await Favourite.find({owner:userId}).populate("nft");
		
			res.status(200).json(favos);
		} catch (err) {
			res.status(500).json(err);
		}
	}


	if (req.method === "DELETE") {
		try {
			const deleteNFT = await Favourite.findByIdAndDelete({owner:userId});
			res.status(200).json(deleteNFT);
		} catch (err) {
			console.log("err");
			res.status(500).json(err);
		}
	}
}
