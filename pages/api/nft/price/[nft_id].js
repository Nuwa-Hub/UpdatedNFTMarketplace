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
      const nft = await NFT.findById(req.query.nft_id).populate("collectionId");
      const list = await Listing.find({ nft: req.query.nft_id }).select(
        "createdAt price"
      );
      const auction = await Auction.find({ nft: req.query.nft_id }).select(
        "createdAt startingPrice"
      );
      var ress = [[],[]];
      
       
      for (let i = 0; i < list.length; i++) {
        ress[0].push(list[i].price.toString());
        ress[1].push(list[i].createdAt.toString().slice(0, 10));
      }

      for (let i = 0; i < auction.length; i++) {
        
            ress[0].push(auction[i].startingPrice.toString());
            ress[1].push(auction[i].createdAt.toString().slice(0, 10));
    
        console.log(auction[i]);
      }

      res.status(200).json(ress);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
