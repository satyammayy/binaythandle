"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const get_urls_1 = __importDefault(require("get-urls"));
class default_1 {
    constructor() {
        this.readdirRecursive = (directory) => {
            const results = [];
            const read = (path) => {
                const files = fs_1.readdirSync(path);
                for (const file of files) {
                    const dir = path_1.join(path, file);
                    if (fs_1.statSync(dir).isDirectory())
                        read(dir);
                    else
                        results.push(dir);
                }
            };
            read(directory);
            return results;
        };
        this.capitalize = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
        this.getUrls = (text) => Array.from(get_urls_1.default(text));
        this.chunk = (arr, length) => {
            const result = [];
            for (let i = 0; i < arr.length / length; i++) {
                result.push(arr.slice(i * length, i * length + length));
            }
            return result;
        };
    }
}
exports.default = default_1;
