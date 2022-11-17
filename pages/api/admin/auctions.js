import NFT from "models/NFT";
import Auction from "models/Auction";
import Bid from "models/Bid";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    //get method for rendering data
    if (method === "GET") {
        try {
            const auctions = await Auction.find().populate("nft").populate("bid").populate("winningBid");
            res.status(200).json(auctions);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }

}
