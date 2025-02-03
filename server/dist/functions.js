"use strict";
const readline = require('readline');
const fs = require('fs');
const cron = require('node-cron');
function startCronJob() {
    // Scan all the computers in the network every 5 seconds
    cron.schedule('*/5 * * * * *', () => {
        console.log(`Computers in the network: `);
    });
}
// startCronJob()
function readDataFileLines(startLine, endLine) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startLine < 1 || endLine < startLine) {
            return reject(new Error('Invalid line range'));
        }
        const fileStream = fs.createReadStream('data/test.jsonl');
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        let currentLine = 0;
        const results = [];
        rl.on('line', (line) => {
            currentLine++;
            // Skip lines before start
            if (currentLine < startLine) {
                return;
            }
            // Stop reading after end line
            if (currentLine > endLine) {
                rl.close();
                return;
            }
            try {
                // Parse each line as JSON
                const parsedLine = JSON.parse(`{"${currentLine}": ${line}}`);
                results.push(parsedLine);
            }
            catch (err) {
                rl.close();
                reject(new Error(`Invalid JSON at line ${currentLine}: ${err.message}`));
            }
        });
        rl.on('close', () => {
            // Check if we found any lines in the specified range
            if (currentLine < startLine) {
                reject(new Error('Start line is beyond file length'));
            }
            else {
                resolve(results);
            }
        });
        rl.on('error', (err) => {
            reject(err);
        });
    });
}
module.exports = {
    readDataFileLines: readDataFileLines
};
