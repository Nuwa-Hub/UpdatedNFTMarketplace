const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
    {
        seller: { type: String, default: "" },
        nft: { type: String, default: "" },
        price: { type: String, default: "" },
        isCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);
delete mongoose.models["Listing"];
export default mongoose.models.Listing ||
    mongoose.model("Listing", ListingSchema);
