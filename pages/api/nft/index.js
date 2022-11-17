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
			const nfts = await NFT.find({ isListed: "true" }).populate("collectionId");
			res.status(200).json(nfts);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	if (method === "POST") {
		// console.log(req.body)
		try {
			const newNFT = new NFT(req.body);
			const nft = await newNFT.save();
			await Collection.findOneAndUpdate(
				{ _id: req.body.collectionId },
				{ $push: { nfts: nft._id } }
			);
			res.status(201).json(nft);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
