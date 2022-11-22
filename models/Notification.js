const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Auction', 'Raffle'], required: true },
    userWalletAddress: { type: String, required: true },
    nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' },
    isRead: { type: Boolean, default: false },
    value:{type:Number, default:0.05}
  },
  { timestamps: true }
);

delete mongoose.models["Notification"];
export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
