import NFT from "models/NFT";
import Notification from "models/Notification";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { user_id } = req.query;

	await connectDB();

	//get method for rendering data
	if (req.method === "GET") {
		try {
			const nft = await Notification.find({userWalletAddress:user_id}).populate("nft");
			res.status(200).json(nft);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	

}
