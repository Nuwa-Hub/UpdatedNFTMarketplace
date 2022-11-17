import Admin from "models/Admin";
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

            let admins = await Admin.find();

            res.status(200).json({ admins });
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
