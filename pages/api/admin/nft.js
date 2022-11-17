import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    //get method for rendering data
    if (method === "GET") {
        try {
            const nfts = await NFT.find().sort({ visits: -1 });
            res.status(200).json(nfts);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
