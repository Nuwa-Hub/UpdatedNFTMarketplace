import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { nft_id } = req.query;

	await connectDB();

	//get method for rendering data
	if (req.method === "GET") {
		try {
			const nft = await NFT.findById(req.query.nft_id).populate("collectionId");
			await NFT.findByIdAndUpdate(req.query.nft_id, { visits: nft.visits + 1 });
			res.status(200).json(nft);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	if (req.method === "PUT") {
		try {
			const updateNFT = await NFT.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true }
			);
			res.status(200).json(updateNFT);
		} catch (err) {
			console.log("err");
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
