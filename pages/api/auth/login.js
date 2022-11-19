import User from "models/User";
import Admin from "models/Admin";
import connectDB from "utils/connectDB";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    if (method === "POST") {

        try {
            let user
            user = await Admin.findOne({ account: req.body.walletAdress });
            if (user) {
                const userToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: true,
                    },
                    process.env.JWT_SEC,
                    { expiresIn: "2d" }
                );
                const { username, account } = user._doc;
                user = { username, walletAdress: account };
                user.isAdmin = true;
                return res.status(200).json({ user, userToken });
            }
            user = await User.findOne({ walletAdress: req.body.walletAdress });
            if (!user) {
                const newUser = new User(req.body);
                user = await newUser.save()
            }
            const userToken = jwt.sign(
                {
                    id: user._id,
                    wallet:user.walletAdress,
                    isAdmin: false,
                },
                process.env.JWT_SEC,
                { expiresIn: "2d" }
            );
            user = user._doc;
            user.isAdmin = false;
            res.status(200).json({ user, userToken });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // res.status(400).json({ message: "Invalid request" });
}
