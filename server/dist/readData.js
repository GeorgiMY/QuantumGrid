"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataFromMongoDB = readDataFromMongoDB;
exports.readDataFromJson = readDataFromJson;
exports.readDataFromPath = readDataFromPath;
const mongoDb_1 = require("./utils/mongoDb");
const fs_1 = require("fs");
const Mongo_1 = __importDefault(require("./models/Mongo"));
const readline_1 = __importDefault(require("readline"));
function readDataFromMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoDb_1.connectToMongoDb)();
        const collections = Mongo_1.default.collection.find();
        return collections;
    });
}
function readDataFromJson(startLine, endLine) {
    return new Promise((resolve, reject) => {
        // Input validation
        if (startLine < 1 || endLine < startLine) {
            return reject(new Error('Invalid line range'));
        }
        const fileStream = (0, fs_1.createReadStream)('data/test.jsonl');
        const rl = readline_1.default.createInterface({
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
function readDataFromPath(path) {
    const fileList = (0, fs_1.readdirSync)(path);
    return fileList;
}
