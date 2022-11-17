const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Auction', 'Raffle'], required: true },
    userWalletAddress: { type: String, required: true },
    nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

delete mongoose.models["Notification"];
export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
