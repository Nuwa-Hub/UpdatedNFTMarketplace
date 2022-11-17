import Favourite from "models/Favourite";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { ...id } = req.query;
	const owner=req.query.slug[1]
	const nftId=req.query.slug[0]

	await connectDB();

	if (req.method === "DELETE") {
		try {
			const deleteNFT = await Favourite.remove({owner:owner,nftId:nftId});
			res.status(200).json(deleteNFT);
		} catch (err) {
			console.log("err");
			res.status(500).json(err);
		}
	}
}
