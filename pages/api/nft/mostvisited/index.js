import NFT from "models/NFT";
import Collection from "models/Collection";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			//console.log("sdf")
			const nfts = await NFT.find({ isListed: "true" }).populate("collectionId").sort({ visits: -1 }).limit(8);
			res.status(200).json(nfts);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	
}
