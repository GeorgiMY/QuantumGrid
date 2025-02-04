import mongoose from "mongoose";
const { Schema } = mongoose;

const MonogosSchema = new Schema({
	title: {
		type: String
	}
}, { timestamps: true })

export default mongoose.model("Mongos", MonogosSchema);
