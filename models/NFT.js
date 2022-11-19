const mongoose = require("mongoose");

const NFTSchema = new mongoose.Schema(
	{
		owner: { type: String, default: "" },
		NFTName: { type: String, default: "" },
		collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
		Img: { type: String, default: "" },
		description: { type: String, default: "" },
		access: { type: Boolean, default: true },
		price: { type: String, default: "" },
		mint: { type: Boolean, default: false },
		isListed: { type: Boolean, default: false },
		tokenId: { type: String, default: "" },
		listing: { type: String, default: "" },
		pinataurl: { type: String, default: "" },
		visits: { type: Number, default: 0 },
        listType:{ type: String, enum: ['raffle', 'fixed','Highest','Decreasing']},
		listId:{ type: String, default: ""},
		fixedValue:{ type: String, default: ""},
	},
	{ timestamps: true }
);
delete mongoose.models["NFT"];
export default mongoose.models.NFT || mongoose.model("NFT", NFTSchema);
