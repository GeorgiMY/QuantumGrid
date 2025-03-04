import fs from "fs";
import path from "path";

// Create .env file in the server directory
async function createEnvFile(serverPath: string): Promise<void> {
    const envPath = path.join(serverPath, ".env");
    try {
        if (!fs.existsSync(envPath)) {
            await fs.promises.writeFile(envPath, "", "utf-8");
            console.log(".env file created successfully at:", envPath);
        } else {
            console.log(".env file already exists at:", envPath);
        }
    } catch (error) {
        console.error("Error creating .env file:", error);
        throw error;
    }
}

// Adds the MongoDB_URI to the env file
async function addMongoDBURIToEnv(envPath: string, uri: string): Promise<void> {
    try {
        if (!fs.existsSync(envPath)) {
            console.error(".env file does not exist at:", envPath);
            throw new Error(".env file not found");
        }

        const envContent = await fs.promises.readFile(envPath, "utf-8");
        const newContent = envContent.includes("MONGO_URI=")
            ? envContent.replace(/MONGO_URI=.*/g, `MONGO_URI=${uri}`)
            : `${envContent}\nMONGO_URI=${uri}`;

        await fs.promises.writeFile(envPath, newContent.trim(), "utf-8");
        console.log("MongoDB URI added/updated successfully in .env file");
    } catch (error) {
        console.error("Error adding MongoDB URI to .env file:", error);
        throw error;
    }
}

// Creates the env file and adds the monogodb uri
export async function createEnvAddMongoDBURI(serverPath: string, uri: string): Promise<void> {
    await createEnvFile(serverPath)
    await addMongoDBURIToEnv(`${serverPath}/.env`, uri)
}

// Adds the software to the server directory at /data/software as software.exe
export async function addSoftware(serverPath: string, softwareFile: File): Promise<void> {
    try {
        const softwareDirectory = path.join(serverPath, 'data', 'software')

        // Check if the /data/software directory exists
        if (!fs.existsSync(softwareDirectory)) {
            // If not, create the /data/software directory
            fs.mkdirSync(softwareDirectory, { recursive: true })
        }

        // Check that the softwareFile is valid
        if (!softwareFile) {
            throw new Error('No software file provided')
        }

        // Read the file data as a buffer using arrayBuffer()
        const buffer = await softwareFile.arrayBuffer()

        // Convert ArrayBuffer to Node.js Buffer
        const fileBuffer = Buffer.from(buffer)

        // Define the destination path for the software file
        const destinationPath = path.join(softwareDirectory, 'software.exe')

        // Use fs.promises to write the file to the destination directory
        await fs.promises.writeFile(destinationPath, fileBuffer)

        console.log('Software added successfully to:', destinationPath)
    } catch (error) {
        console.error('Error adding software:', error)
        throw new Error('Failed to add software to the server directory')
    }
}
