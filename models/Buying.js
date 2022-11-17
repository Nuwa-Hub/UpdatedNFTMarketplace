const mongoose = require("mongoose");

const BuyingSchema = new mongoose.Schema(
    {
        seller: { type: String, default: "" },
        nft: { type: String, default: "" },
        price: { type: String, default: "" },
        buyer: { type: String, default: "" },
    },
    { timestamps: true }
);
delete mongoose.models["Buying"];
export default mongoose.models.Buying ||
    mongoose.model("Buying", BuyingSchema);
