// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Collection from "models/Collection";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const collections = await Collection.find();
			res.status(200).json(collections);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	if (method === "POST") {
		
		// console.log(req.body)
		try {
			const newCollection = new Collection(req.body);
			const collection = await newCollection.save();
			res.status(201).json(collection);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
