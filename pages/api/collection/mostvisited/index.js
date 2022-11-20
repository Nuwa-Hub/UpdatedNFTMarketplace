// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Collection from "models/Collection";
import User from "models/User";
import connectDB from "utils/connectDB";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
	const { method } = req;

	//db connect()
	await connectDB();

	//get method for rendering data
	if (method === "GET") {
		try {
			const collections = await Collection.find().sort({ visits: -1 }).limit(6);
			res.status(200).json(collections);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	//for insert data
	
}