import Bid from "models/Bid";
import connectDB from "utils/connectDB";

// Find the bid by auction id
export default async function handler(req, res) {
    const { bid_id } = req.query;

    await connectDB();

    //get method for rendering data
    if (req.method === "GET") {
        try {
            const bid = await Bid.findById(bid_id);
            res.status(200).json(bid);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (req.method === "PUT") {
        try {
            const updateBid = await Bid.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updateBid);
        } catch (err) {
            console.log("err")
            res.status(500).json(err);
        }
    }

    if (req.method === "DELETE") {
        try {
            const deleteBid = await Bid.findByIdAndDelete(req.params.id);
            res.status(200).json(deleteBid);
        } catch (err) {
            console.log("err")
            res.status(500).json(err);
        }
    }
}
