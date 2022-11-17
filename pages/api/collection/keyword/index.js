import Collection from "models/Collection";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	console.log(req.url);
	console.log(req.query.keyword);
	const { method } = req;
	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const collections = await Collection.find(
				{
					collectionName: {
						$regex: "^" + req.query.keyword + ".*",
						$options: "i",
					},
				},
				null,
				{ strictQuery: false }
			);
			console.log(collections);
			res.status(200).json(collections);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
