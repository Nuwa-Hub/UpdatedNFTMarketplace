const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
	{
		owner: { type: mongoose.Schema.Types.String, default: "" },
		nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT', default: "" },
		bid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
		startDate: { type: mongoose.Schema.Types.Date, default: null },
		endDate: { type: mongoose.Schema.Types.Date, default: null },
		auctionType: { type: String, enum: ['Highest', 'Decreasing'] },
		startingPrice: { type: mongoose.Schema.Types.Number },
		endingPrice: { type: mongoose.Schema.Types.Number, default: 0 },
		status: { type: mongoose.Schema.Types.String, enum: ['Bidding', 'Pending', 'Completed', 'Rejected'], default: 'Bidding' },
		access: { type: Boolean, default: true },
		winner: { type: String, default: "" },
		winningBid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', default: null },
	},
	{ timestamps: true }
);
delete mongoose.models["Auction"];
export default mongoose.models.Auction ||
	mongoose.model("Auction", AuctionSchema);
