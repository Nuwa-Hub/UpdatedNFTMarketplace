import Auction from "models/Auction";
import Listing from "models/Listing";
import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
  const { nft_id } = req.query;

  await connectDB();

  //get method for rendering data
  if (req.method === "GET") {
    try {
      const listings = await Listing.find({ nft: nft_id });
      res.status(200).json(listings);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
