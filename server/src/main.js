const express = require('express')
const app = express()
const readline = require('readline')
const fs = require('fs')
// const cron = require('node-cron')

const PORT = 3000
app.locals.jsonUntill = 1
app.locals.jsonIncrementation = 100

// function startCronJob() {
// 	cron.schedule('* * * * * *', () => {
// 		console.log(`Computers in the network: 5`)
// 	})
// }

// startCronJob()

function readDataFileLines(startLine, endLine) {
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
        const results = []

        rl.on('line', (line) => {
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
            } catch (err) {
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

        rl.on('error', (err) => {
            reject(err)
        });
    });
}

app.get('/', async (req, res) => {
    try {
        const data = await readDataFileLines(app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation);
        app.locals.jsonUntill += app.locals.jsonIncrementation;
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send("All files have currently been distributed.");
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
