"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs'
// import path from'path'
// import {getData} from './getPFParseData'
var fs = require('fs');
var path = require('path');
var pfData = require("./getPFParseData");
pfData.getData()
    .then(function (data) {
    var filename = path.join(__dirname, '../public/data.json');
    console.log("writing to: " + filename);
    fs.writeFile(filename, JSON.stringify(data), function (error) {
        console.log("there was an error writing to file(" + filename + "): " + error);
    });
})
    .catch(function (error) {
    return console.log("There was an error: " + error);
});
