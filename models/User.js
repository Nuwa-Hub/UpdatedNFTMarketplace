const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, default: "Unnamed" },
    img: { type: String, default: "" },
    walletAdress: { type: String, required: true, unique: true },
    address: { type: String,  default: "none" },
    telNo: { type: String, default: "none" },
    email: { type: String, default: "none" },
    about: { type: String, default: "none" },
    firstname: { type: String, default: "none" },
    lastname: { type: String, default: "none" },
    country: { type: String, default: "none" },
    birthday: { type: String, default: "none" },
    favoriteList: { type: Array, default: "" },
    access: { type: Boolean, default: true },
  },
  { timestamps: true }
);
delete mongoose.models["User"];
export default mongoose.models.User || mongoose.model("User", UserSchema);
