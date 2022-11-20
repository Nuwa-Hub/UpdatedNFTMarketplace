import NFT from "models/NFT";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;
    const { nft_id } = req.query;

    //db connect()
    await connectDB();

    //put method for updating data
   if (method === "PUT") {
    try {
        const updatedNFT = await NFT.findByIdAndUpdate(nft_id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedNFT);
    } catch (err) {
        res.status(500).json(err);
    }
}

}

 
 