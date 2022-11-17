import User from "models/User";
import Collection from "models/Collection";
import NFT from "models/NFT";
import connectDB from "utils/connectDB";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    if (method === "GET") {
        let token;
        const authHeader = req.headers.authorization;
        // if (authHeader && authHeader.startsWith("Bearer ")) {
        try {

            const users = await User.aggregate([
                {
                    '$lookup': {
                        'from': 'collections',
                        'localField': 'walletAdress',
                        'foreignField': 'owner',
                        'as': 'collections'
                    }
                }, {
                    '$lookup': {
                        'from': 'nfts',
                        'localField': 'walletAdress',
                        'foreignField': 'owner',
                        'as': 'nfts'
                    }
                }
            ])
            // console.log(users);
            res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
        // } else {
        //     res.status(401).json({ message: "Not authorized" });
        // }
    }
    // res.status(400).json({ message: "Invalid request" });
}
