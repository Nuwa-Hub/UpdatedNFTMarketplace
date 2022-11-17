import Auction from "models/Auction";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;
    const { auction_id } = req.query;

    //db connect()
    await connectDB();

    //put method for updating data
   if (method === "PUT") {
    try {
        const updatedAuction = await Auction.findByIdAndUpdate(auction_id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedAuction);
    } catch (err) {
        res.status(500).json(err);
    }
}

}

 
 