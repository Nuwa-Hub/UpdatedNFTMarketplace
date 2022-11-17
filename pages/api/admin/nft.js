import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 1000;
    //db connect()
    await connectDB();

    //get method for rendering data
    if (method === "GET") {
        try {
            const nfts = await NFT.find().sort({ visits: -1 }).limit(limit * 1).skip((page - 1) * limit).populate("collectionId");
            res.status(200).json(nfts);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
