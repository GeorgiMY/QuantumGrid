import mongoose from "mongoose"

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
        const documents = await collection.find({})
            .skip(start) // Skip the first 'start' documents
            .limit(end - start) // Limit the number of documents returned
            .toArray(); // Convert the cursor to an array
        return documents;
    } catch (error) {
        console.error('Error retrieving documents:', error);
    }
}

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
