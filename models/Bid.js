const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema(
	{
		auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
		bidder: { type: mongoose.Schema.Types.String, default: "" },
		value: { type: mongoose.Schema.Types.Number },
	},
	{ timestamps: true }
);

export default mongoose.models.Bid || mongoose.model("Bid", BidSchema);
