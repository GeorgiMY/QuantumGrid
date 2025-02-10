import mongoose from "mongoose"

export async function connectToMongoDb() {
	const mongodb_uri = process.env.MONGODB_URI

	if (!mongodb_uri) throw new Error("No database uri");

	try {
		await mongoose.connect(mongodb_uri);
		console.log("Connection Successfull")
	} catch (error) {
		console.log("Received an Error: ", error)
	}
}

async function findDocument(collectionName: string, query: Record<string, any>) {
	await connectToMongoDb();

	const collection = mongoose.connection.collection(collectionName);

	try {
		const document = await collection.findOne(query);
		return document;
	} catch (error) {
		console.error('Error retrieving document: ', error);
	}
}

export async function findDocuments(collectionName: string, start: number, end: number) {
	const collection = mongoose.connection.collection(collectionName);

	try {
		const documents = await collection.find()
			.skip(start) // Skip the first 'start' documents
			.limit(end - start) // Limit the number of documents returned
			.toArray(); // Convert the cursor to an array
		return documents;
	} catch (error) {
		console.error('Error retrieving documents:', error);
	}
}

export async function insertNewDocument(collectionName: string) {
	await connectToMongoDb();

	const collection = mongoose.connection.collection(collectionName);

	try {
		const result = await collection.insertOne(document);
		return result;
	} catch (error) {
		console.error('Error inserting document:', error);
	}

}

export async function insertNewDocuments(collectionName: string, documents: any[]) {
	await connectToMongoDb();

	const collection = mongoose.connection.collection(collectionName);

	try {
		const result = await collection.insertMany(documents);
		return result;
	} catch (error) {
		console.error('Error inserting documents:', error);
	}
}
