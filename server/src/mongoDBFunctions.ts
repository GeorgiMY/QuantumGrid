import mongoose from "mongoose"

// Connect to the MongoDB db
export async function connectToMongoDb() {
    const mongodb_uri = process.env.MONGODB_URI

    if (!mongodb_uri) throw new Error("No database uri");

    try {
        await mongoose.connect(mongodb_uri);
    } catch (error) {
        console.log("Received an Error: ", error)
    }
}

// Find one specific document
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

// Find documents from a collection
export async function findDocuments(collectionName: string, start: number, end: number): Promise<mongoose.mongo.WithId<mongoose.AnyObject>[]> {
    await connectToMongoDb();

    const collection = mongoose.connection.collection(collectionName);

    try {
        const documents = await collection.find({})
            .skip(start) // Skip the first 'start' documents
            .limit(end - start) // Limit the number of documents returned
            .toArray(); // Convert the cursor to an array
        return documents;
    } catch (error) {
        console.error('Error retrieving documents:', error);
        throw error; // Rethrow the error for further handling
    }
}

// Insert document in specific collection
export async function insertNewDocument(collectionName: string, document: any) {
    await connectToMongoDb();

    const collection = mongoose.connection.collection(collectionName);

    try {
        const result = await collection.insertOne(document);
        return result;
    } catch (error) {
        console.error('Error inserting document:', error);
    }

}

// Insert multiple documents in one collection (with the idea of less requests being made)
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
