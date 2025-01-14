const express = require('express')
const app = express()
const fs = require('fs')
const cron = require('node-cron')
const PORT = 3000

function startCronJob() {
	cron.schedule('* * * * * *', () => {
		console.log(`Computers in the network: 5`);
	})
}

startCronJob()

function readDataFile() {
	return new Promise((resolve, reject) => {
		fs.readFile("./data/test.jsonl", "utf-8", (err, data) => {
			if (err) return reject(err);
			resolve(data);
		})
	})
}

app.get('/cron', (req, res) => {
	res.send("cron started")
})

app.get('/', async (req, res) => {
	const data = await readDataFile();
	console.log(data);
})

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})
