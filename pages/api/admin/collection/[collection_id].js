import Collection from "models/Collection";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
    const { method } = req;
    const { collection_id } = req.query;

    //db connect()
    await connectDB();

    //put method for updating data
   if (method === "PUT") {
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(collection_id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCollection);
    } catch (err) {
        res.status(500).json(err);
    }
}

}

 
 