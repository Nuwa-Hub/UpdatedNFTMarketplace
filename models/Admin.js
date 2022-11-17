const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    account: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    telNumber: { type: String, required: true },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);
//module.exports = mongoose.model("Admin", AdminSchema);
delete mongoose.models["Admin"];
export default mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);