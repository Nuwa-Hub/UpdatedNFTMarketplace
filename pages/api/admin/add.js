import Admin from "models/Admin";
import connectDB from "utils/connectDB";
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    const { method } = req;

    //db connect()
    await connectDB();

    if (method === "POST") {
        console.log(req.body);
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
            address: req.body.address,
            telNumber: req.body.telNumber,
            img: req.body.img,
            account: req.body.account,
        });

        try {
            const savedAdmin = await newAdmin.save();
            res.status(201).json(savedAdmin);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
