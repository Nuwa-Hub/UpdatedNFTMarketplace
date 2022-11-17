import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;
	//db connect()
	await connectDB();
	console.log(req.url);
	console.log(req.query.keyword);

	//get method for rendering data
	if (method === "GET") {
		try {
			const nfts = await NFT.find(
				{
					NFTName: {
						$regex: "^" + req.query.keyword + ".*",
						$options: "i",
					},
				},
				null,
				{ strictQuery: false }
			);
			res.status(200).json(nfts);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
