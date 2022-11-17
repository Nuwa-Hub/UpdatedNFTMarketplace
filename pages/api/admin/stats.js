import NFT from "models/NFT";
import Collection from "models/Collection";
import Listing from "models/Listing";
import Auction from "models/Auction";
import Raffle from "models/Raffle";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    //get method for rendering data
    if (method === "GET") {
        try {
            const data = {};
            data.nfts = await NFT.aggregate([
                {
                    '$group': {
                        '_id': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'month': {
                                '$month': '$createdAt'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }
            ]);
            data.collections = await Collection.aggregate([
                {
                    '$group': {
                        '_id': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'month': {
                                '$month': '$createdAt'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }
            ]);
            data.listings = await Listing.aggregate([
                {
                    '$group': {
                        '_id': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'month': {
                                '$month': '$createdAt'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }
            ]);
            data.auctions = await Auction.aggregate([
                {
                    '$group': {
                        '_id': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'month': {
                                '$month': '$createdAt'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }
            ]);
            data.raffles = await Raffle.aggregate([
                {
                    '$group': {
                        '_id': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'month': {
                                '$month': '$createdAt'
                            }
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }
            ]);
            // console.log(data);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
