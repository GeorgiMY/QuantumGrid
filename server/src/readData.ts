import mongoose from "mongoose";

export async function connectToDb() {
	const mongodb_uri = process.env.MONGODB_URI

	if (!mongodb_uri) throw new Error("No database uri")

	await mongoose.connect(mongodb_uri)
		.then(() => {
			console.log("Connection Successfull")
		}).catch((err) => {
			console.log("Received an Error: ", err)
		})
}

export async function readDataFromMongoDB() {
	await connectToDb()
}

export function readDataFromJson(startLine: number, endLine: number): Promise<string[]> {
	return new Promise((resolve, reject) => {
		// Input validation
		if (startLine < 1 || endLine < startLine) {
			return reject(new Error('Invalid line range'))
		}

		const fileStream = fs.createReadStream('data/test.jsonl')
		const rl = readline.createInterface({
			input: fileStream,
			crlfDelay: Infinity
		})

		let currentLine = 0
		const results: string[] = []

		rl.on('line', (line: string) => {
			currentLine++

			// Skip lines before start
			if (currentLine < startLine) {
				return
			}

			// Stop reading after end line
			if (currentLine > endLine) {
				rl.close()
				return
			}

			try {
				// Parse each line as JSON
				const parsedLine = JSON.parse(`{"${currentLine}": ${line}}`)
				results.push(parsedLine)
			} catch (err: any) {
				rl.close()
				reject(new Error(`Invalid JSON at line ${currentLine}: ${err.message}`))
			}
		});

		rl.on('close', () => {
			// Check if we found any lines in the specified range
			if (currentLine < startLine) {
				reject(new Error('Start line is beyond file length'))
			} else {
				resolve(results)
			}
		})

		rl.on('error', (err: any) => {
			reject(err)
		});
	});
}
