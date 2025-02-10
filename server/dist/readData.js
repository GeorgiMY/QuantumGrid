"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataFromMongoDB = readDataFromMongoDB;
exports.readDataLinesFromJson = readDataLinesFromJson;
exports.readDataObjectsFromJson = readDataObjectsFromJson;
exports.readDataFromPath = readDataFromPath;
const fs_1 = require("fs");
const readline_1 = __importDefault(require("readline"));
const mongoDBFunctions_1 = require("./utils/mongoDBFunctions");
async function readDataFromMongoDB() {
    const response = await fetch("../project-config.json");
    const data = await response.json();
    const collectionName = data.collectionName;
    const collections = (0, mongoDBFunctions_1.findDocuments)(collectionName, 0, 5);
    return collections;
}
// Read data from a JSON line by line
async function readDataLinesFromJson(pathToJSON, startLine, endLine) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startLine < 1 || endLine < startLine)
            return reject(new Error('Invalid line range'));
        const fileStream = (0, fs_1.createReadStream)(pathToJSON);
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        let currentLine = 0;
        const results = [];
        rl.on('line', (line) => {
            currentLine++;
            // Skip lines before start
            if (currentLine < startLine)
                return;
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
            if (currentLine < startLine)
                reject(new Error('Start line is beyond file length'));
            else
                resolve(results);
        });
        rl.on('error', (err) => {
            reject(err);
        });
    });
}
// Read data from a JSON by documents
// NEED TO IMPROVE, currently loads the entire file instead of streaming
async function readDataObjectsFromJson(pathToJSON, startIndex, endIndex) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startIndex < 0 || endIndex < startIndex)
            return reject(new Error('Invalid object range'));
        const fileStream = (0, fs_1.createReadStream)(pathToJSON);
        let jsonString = '';
        fileStream.on('data', (chunk) => {
            jsonString += chunk.toString();
        });
        fileStream.on('end', () => {
            try {
                const jsonData = JSON.parse(jsonString); // Parse full JSON
                if (!Array.isArray(jsonData))
                    return reject(new Error('JSON data is not an array'));
                const selectedObjects = jsonData.slice(startIndex, endIndex + 1); // Extract objects in range
                resolve(selectedObjects);
            }
            catch (error) {
                reject(new Error(`Error parsing JSON: ${error}`));
            }
        });
        fileStream.on('error', (error) => {
            reject(error);
        });
    });
}
// Gets all the paths from a folder
function readDataFromPath(path) {
    const filePathsList = (0, fs_1.readdirSync)(path);
    return filePathsList;
}
