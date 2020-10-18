"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var pfData = require("./getPFParseData");
var args = process.argv;
console.log(args);
pfData.getData()
    .then(function (_a) {
    var players = _a.players, teams = _a.teams, games = _a.games;
    // const filename = path.join(__dirname, '../public/data.json')
    console.log("creating data files");
    fs.writeFile(path.join(__dirname, '../public/players.json'), JSON.stringify(players), function (error) {
        if (error)
            console.log("there was an error writing to file: " + error);
    });
    fs.writeFile(path.join(__dirname, '../public/teams.json'), JSON.stringify(teams), function (error) {
        if (error)
            console.log("there was an error writing to file: " + error);
    });
    fs.writeFile(path.join(__dirname, '../public/games.json'), JSON.stringify(games), function (error) {
        if (error)
            console.log("there was an error writing to file: " + error);
    });
})
    .catch(function (error) {
    return console.log("There was an error: " + error);
});
