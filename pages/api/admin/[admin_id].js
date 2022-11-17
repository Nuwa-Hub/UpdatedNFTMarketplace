import Admin from "models/Admin";
import connectDB from "utils/connectDB";
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    const { admin_id } = req.query;

    await connectDB();

    //get method for rendering data
    if (req.method === "GET") {
        try {
            const admin = await Admin.findById(admin_id);
            res.status(200).json(admin);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (req.method === "PUT") {
        try {
            const newAdmin = {
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
            };
            const updateAdmin = await Admin.findByIdAndUpdate(
                admin_id,
                { $set: newAdmin },
                { new: true }
            );
            res.status(200).json(updateAdmin);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    if (req.method === "DELETE") {
        try {
            const deleteAdmin = await Admin.findByIdAndDelete(req.params.id);
            res.status(200).json(deleteAdmin);
        } catch (err) {
            console.log("err")
            res.status(500).json(err);
        }
    }
}
