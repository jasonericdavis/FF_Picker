"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getPFParseData_1 = require("./getPFParseData");
getPFParseData_1.getData()
    .then(function (data) {
    var filename = path_1.default.join(__dirname, 'public/data.json');
    console.log("writing to: " + filename);
    fs_1.default.writeFile(filename, JSON.stringify(data), function (error) {
        console.log("there was an error writing to file(" + filename + "): " + error);
    });
})
    .catch(function (error) {
    return console.log("There was an error: " + error);
});
