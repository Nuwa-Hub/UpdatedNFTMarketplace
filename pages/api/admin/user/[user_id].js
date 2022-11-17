import User from "models/User";
import Collection from "models/Collection";
import NFT from "models/NFT";
import connectDB from "utils/connectDB";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    const { method } = req;
    const { user_id } = req.query;
    //db connect()
    await connectDB();

    if (method === "GET") {
        const { user_id } = req.query;
        try {

            let user = await User.aggregate([
                {
                    '$match': {
                        'walletAdress': user_id
                    }
                }, {
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
            if (user[0]) {
                user = user[0];
                let auctionAndBids = await User.aggregate([
                    {
                        '$match': {
                            'walletAdress': user_id
                        }
                    }, {
                        '$lookup': {
                            'from': 'bids',
                            'localField': 'walletAdress',
                            'foreignField': 'bidder',
                            'as': 'bids'
                        }
                    }, {
                        '$unwind': {
                            'path': '$bids',
                            'preserveNullAndEmptyArrays': true
                        }
                    }, {
                        '$lookup': {
                            'from': 'auctions',
                            'localField': 'bids.auctionId',
                            'foreignField': '_id',
                            'as': 'auction'
                        }
                    }, {
                        '$unwind': {
                            'path': '$auction',
                            'preserveNullAndEmptyArrays': true
                        }
                    }, {
                        '$group': {
                            '_id': '$_id',
                            'walletAdress': {
                                '$first': '$walletAdress'
                            },
                            'auctions': {
                                '$push': '$auction'
                            },
                            'bids': {
                                '$push': '$bids'
                            }
                        }
                    }
                ])
                user.auctions = auctionAndBids[0].auctions;
                user.bids = auctionAndBids[0].bids;
                // console.log(user)
                return res.status(200).json({ user });
            } else {
                return res.status(404).json({ success: false, message: "User not found" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
        // } else {
        //     res.status(401).json({ message: "Not authorized" });
        // }
    }
    if (req.method === "PUT") {
        try {
            const newUser = { ...req.body };

            const updateUser = await User.findByIdAndUpdate(
                new mongoose.Types.ObjectId(user_id),
                { $set: newUser },
                { new: true }
            );
            res.status(200).json(updateUser);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
    // res.status(400).json({ message: "Invalid request" });
}
