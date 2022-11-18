import Favourite from "models/Favourite";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { collection_id } = req.query;

	await connectDB();

	//get the favourite objects from the collection id
	if (req.method === "GET") {
		try {
			const favos = await Favourite.find().populate({
				path: "nft",
				match: {
					collectionId: collection_id,
				},
			});

			const q = favos.reduce(
				(s, { nftId }) => ((s[nftId] = (s[nftId] || 0) + 1), s),
				{}
			);
			let r = Object.keys(q).map((key) => ({
				nft: key,
				count: q[key],
				full_nft: favos.find((favo) => favo.nftId === key).nft,
			}));
			let sorted = r.sort(
				(a, b) => parseFloat(b.count) - parseFloat(a.count)
			);
			// console.log(sorted);

			res.status(200).json(sorted);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
