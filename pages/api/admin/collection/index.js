// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Collection from "models/Collection";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 1000;

    // console.log(limit, page);
    //db connect()
    await connectDB();

    //get method for rendering data
    if (method === "GET") {
        try {
            const collections = await Collection.find().sort({ visits: -1 }).limit(limit * 1).skip((page - 1) * limit)//.populate("nfts");
            res.status(200).json(collections);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
