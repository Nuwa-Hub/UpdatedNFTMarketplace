import Listing from "models/Listing";
import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    //get method for rendering data
    if (method === "GET") {
        try {
            const nft_id = req.query.nft_id;
            const listing = await Listing.findOne({ nft: nft_id });
            res.status(200).json(listing);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    //for insert data
    // if (method === "POST") {
    //     // console.log(req.body)
    //     try {
    //         log("req.body", req.body);
    //         const newListing = new Listing(req.body);
    //         const listing = await newListing.save();
    //         await NFT.findByIdAndUpdate(req.body.nft, { isListed: true, price: req.body.price })
    //         res.status(201).json(listing);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // }
}
