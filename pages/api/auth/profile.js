import User from "models/User";
import Admin from "models/Admin";
import connectDB from "utils/connectDB";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    if (method === "GET") {
        let token;
        let user;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                token = authHeader.split(" ")[1];

                const decoded = jwt.verify(token, process.env.JWT_SEC);
                user = await Admin.findById(decoded.id).select("-password");
                if (user) {
                    user = user._doc;
                    user.isAdmin = true;
                    return res.status(200).json({ user });
                }
                user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(401).json({ msg: "User not found" });
                }

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
