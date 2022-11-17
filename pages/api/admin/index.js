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
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                token = authHeader.split(" ")[1];

                const decoded = jwt.verify(token, process.env.JWT_SEC);
                let user = await Admin.findById(decoded.id);

                user = user._doc;
                res.status(200).json({ user });
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    }
    // res.status(400).json({ message: "Invalid request" });
}
