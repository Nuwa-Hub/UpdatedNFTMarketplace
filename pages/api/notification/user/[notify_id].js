import Favourite from "models/Favourite";
import Notification from "models/Notification";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
	const { notify_id } = req.query;
	

	await connectDB();

	if (req.method === "DELETE") {
		try {
			const deletenotify = await Notification.remove({_id:notify_id});
			res.status(200).json(deletenotify);
		} catch (err) {
			console.log("err");
			res.status(500).json(err);
		}
	}
}
