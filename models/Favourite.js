const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    owner: { type: String, default: "" },
    nftId: { type: String, default: "" },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Collection", CollectionSchema);
delete mongoose.models["Favorite"];
export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);