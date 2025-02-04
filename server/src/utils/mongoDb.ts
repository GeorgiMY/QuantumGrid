import mongoose from "mongoose"

export async function connectToMongoDb() {
	const mongodb_uri = process.env.MONGODB_URI

	if (!mongodb_uri) throw new Error("No database uri")

	await mongoose.connect(mongodb_uri)
		.then(() => {
			console.log("Connection Successfull")
		}).catch((err) => {
			console.log("Received an Error: ", err)
		})
}
