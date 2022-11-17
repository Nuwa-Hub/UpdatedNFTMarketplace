import Admin from "models/Admin";
import connectDB from "utils/connectDB";
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    if (method === "POST") {

        try {
            const user = await Admin.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json("Wrong credentials!");
            }

            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if (OriginalPassword !== req.body.password) {
                return res.status(401).json("Wrong credentials!");
            }

            const adminToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: true,
                },
                process.env.JWT_SEC,
                { expiresIn: "2d" }
            );

            const { password, ...others } = user._doc;
            res.status(200).json({ admin: others, adminToken });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // res.status(400).json({ message: "Invalid request" });
}
