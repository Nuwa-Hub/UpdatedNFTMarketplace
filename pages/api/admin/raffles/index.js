import Raffle from "models/Raffle";
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
            const nfts = await Raffle.find().populate("nft").limit(limit).skip((page - 1) * limit);
            res.status(200).json(nfts);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
