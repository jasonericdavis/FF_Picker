"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
var fs = require('fs').promises;
var path = require('path');
var playersFilename = 'pfW5Players.csv';
var teamOffenseFilename = 'pfW5TeamOffense.csv';
var teamDefenseFilename = 'pfW5TeamDefense.csv';
var scheduleFilename = 'pfSchedule.csv';
var parsePlayerData = function (data) {
    var lines = data.split('\n');
    var columns = {};
    var players = {};
    lines.map(function (line, index) {
        // the first line contains the keys
        var cols = line.split(',');
        if (index < 1) {
            cols.map(function (col, colIndex) {
                var tempColName = col;
                var colNameCounter = 0;
                /**
                 * Because the name of a column can appear multiple times in the list of columns
                 * this logic will append a suffix to the column if it is already in the list of columns
                 * */
                while (columns["" + tempColName]) {
                    colNameCounter += 1;
                    tempColName = tempColName.replace("_" + (colNameCounter - 1), '') + "_" + colNameCounter;
                }
                columns[tempColName] = colIndex;
            });
            // console.log(columns)
            return;
        }
        else {
            //use the columns to create an object for each player and push into array
            var newPlayer = {
                name: cols[columns['Player']].split('\\')[0],
                id: cols[columns['Player']].split('\\')[1],
                position: cols[columns['FantPos']],
                fantasyPoints: Number(cols[columns['FantPt']]),
                team: cols[columns['Tm']],
                teamNickname: cols[columns['Tm']],
                completions: cols[columns['Cmp']],
                passingAttempts: cols[columns['Att']],
                passingYards: cols[columns['Yds']],
                passingTouchdowns: cols[columns['Td']],
                int: cols[columns['Int']],
                attempts: cols[columns['Att_1']],
                rushingYards: cols[columns['Yds_1']],
                rushingAverage: cols[columns['Y/A']],
                rushingTouchdowns: cols[columns['TD_1']],
                targets: cols[columns['Tgt']],
                receptions: cols[columns['Rec']],
                receivingYards: cols[columns['Yds_2']],
                receivingAverage: cols[columns['Y/R']],
                receivingTouchdowns: cols[columns['TD_2']]
            };
            players[newPlayer['id']] = newPlayer;
        }
    });
    return players;
};
var parseOffensiveData = function (data) {
    var lines = data.split('\n');
    var columns = {};
    var offenses = {};
    lines.map(function (line, index) {
        // the first line contains the keys
        var cols = line.split(',');
        if (index < 1) {
            cols.map(function (col, colIndex) {
                var tempColName = col;
                var colNameCounter = 0;
                /**
                 * Because the name of a column can appear multiple times in the list of columns
                 * this logic will append a suffix to the column if it is already in the list of columns
                 * */
                while (columns["" + tempColName]) {
                    colNameCounter += 1;
                    tempColName = tempColName.replace("_" + (colNameCounter - 1), '') + "_" + colNameCounter;
                }
                columns[tempColName] = colIndex;
            });
            return;
        }
        else {
            var newOffense = {
                team: cols[columns['Tm']],
                passingCompletions: Number(cols[columns['Cmp']]),
                passingAttempts: Number(cols[columns['Att']]),
                passingYards: Number(cols[columns['Yds_1']]),
                passingTouchdowns: Number(cols[columns['TD']]),
                interceptions: Number(cols[columns['Int']]),
                rushingAttempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_2']]),
                rushingTouchdowns: Number(cols[columns['TD_1']])
            };
            offenses[newOffense.team] = newOffense;
        }
    });
    return offenses;
};
var parseDefensiveData = function (data) {
    var lines = data.split('\n');
    var columns = {};
    var defenses = {};
    lines.map(function (line, index) {
        // the first line contains the keys
        var cols = line.split(',');
        if (index < 1) {
            cols.map(function (col, colIndex) {
                var tempColName = col;
                var colNameCounter = 0;
                /**
                 * Because the name of a column can appear multiple times in the list of columns
                 * this logic will append a suffix to the column if it is already in the list of columns
                 * */
                while (columns["" + tempColName]) {
                    colNameCounter += 1;
                    tempColName = tempColName.replace("_" + (colNameCounter - 1), '') + "_" + colNameCounter;
                }
                columns[tempColName] = colIndex;
            });
            // console.log(columns)
            return;
        }
        else {
            var newDefense = {
                team: cols[columns['Tm']],
                pointsAllowed: Number(cols[columns['PF']]),
                totalYards: Number(cols[columns['Yds']]),
                takeAways: Number(cols[columns['TO']]),
                fumbles: Number(cols[columns['FL']]),
                passingAttempts: Number(cols[columns['Att']]),
                interceptions: Number(cols[columns['Int']]),
                passingYards: Number(cols[columns['Yds_1']]),
                passingTouchdowns: Number(cols[columns['TD']]),
                rushingAttempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_2']]),
                rushingTouchdowns: Number(cols[columns['TD_1']]),
            };
            defenses[newDefense.team] = newDefense;
        }
    });
    return defenses;
};
/**
 * This method combines the offenses and defenses into an array
 * of objects that contain both the offense and defense for a particular team
 * @param {Object.<string, offense>} offense The offenses to be combined
 * @param {Dictionary[Deffense]} defense The offenses to be combined
 * @returns {Team[]} An array with the Team objects
 */
var createTeams = function (offenses, defenses) {
    var offensesArray = Object.values(offenses);
    var teams = [];
    offensesArray.map(function (offense) {
        teams.push({ name: offense.team, offense: offense, defense: defenses.filter(function (def) { return def.team == offense.team; })[0] });
    });
    return teams;
};
var parseSchedule = function (data) {
    var week = '5';
    var lines = data.split('\n');
    var games = [];
    lines.map(function (line, index) {
        var cols = line.split(',');
        // If its not the week we are looking for skip
        if (cols[0] != week)
            return;
        games.push({
            home: cols[4],
            away: cols[6]
        });
    });
    return games;
};
var getCSVData = function (filename, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var filepath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filepath = path.join(process.cwd(), '../data', filename);
                console.log("Reading CSV file: " + filepath);
                return [4 /*yield*/, fs.readFile(filepath, 'utf8', callback)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var calculatePlayerRatios = function (player, offense, defense) {
    var playerStat = player.PassingYards + player.RushingYards + player.ReceivingYards;
    var teamOffense = offense.PassingYards + offense.RushingYards;
    var teamDefense = defense.PassingYards + defense.RushingYards;
    var Ratio = {
        Offensive: playerStat / teamOffense,
        Passing: player.PassingYards / defense.PassingYards,
        Rushing: player.RushingYards / defense.RushingYards,
        Defense: playerStat / teamDefense
    };
    return __assign(__assign({}, player), { Ratio: Ratio });
};
var parseGameData = function (schedule, offense, defense, players) {
    var games = [];
    schedule.map(function (scheduledGame) {
        var game = __assign({}, scheduledGame);
        var hOffense = offense[game.home];
        var aOffense = offense[game.away];
        var hDefense = defense[game.home];
        var aDefense = defense[game.away];
        game.home = { Offense: __assign({}, hOffense), Defense: __assign({}, hDefense) };
        game.away = { Offense: __assign({}, aOffense), Defense: __assign({}, aDefense) };
        // Add game ratios
        var hOffenseYards = hOffense.passingYards + hOffense.rushingYards;
        var aOffenseYards = aOffense.passingYards + hOffense.rushingYards;
        var hDefenseYards = hDefense.passingYards + hDefense.rushingYards;
        var aDefenseYards = aDefense.passingYards + aDefense.rushingYards;
        // game.HomeOffensiveYards = hOffenseYards
        // game.AwayOffensiveYards = aOffenseYards
        // game.HomeDefensiveYards = hDefenseYards
        // game.AwayDefensiveYards = aDefenseYards
        game.ratios = {
            homeOffense: hOffenseYards / aDefenseYards,
            homePassingOffense: hOffense.passingYards / aDefense.passingYards,
            homeRushingYards: hOffense.rushingYards / aDefense.rushingYards,
            homeDefensive: aOffenseYards / hDefenseYards,
            homePassingDefense: aOffense.passingYards / hDefense.passingYards,
            homeRushingDefense: aOffense.rushingYards / hDefense.rushingYards,
            awayOffense: aOffenseYards / hDefenseYards,
            awayPassingOffense: aOffense.passingYards / hDefense.passingYards,
            awayRushingYards: aOffense.rushingYards / hDefense.rushingYards,
            awayDefensive: hOffenseYards / aDefenseYards,
            awayPassingDefense: hOffense.passingYards / aDefense.passingYards,
            awayRushingDefense: hOffense.rushingYards / aDefense.rushingYards,
        };
        // Add the player information to the game
        game.home.players = [];
        game.away.players = [];
        // filter to create an array containing only the players that play for the teams
        // that are participating in the game
        var gamePlayers = players.filter(function (player) { return (player.teamNickname === game.home || player.teamNickname === game.away); });
        gamePlayers.map(function (player) {
            if (player.teamNickname === game.home) {
                player = calculatePlayerRatios(player, game.home.offense, game.away.defense);
                game.home.players.push(player);
            }
            else {
                player = calculatePlayerRatios(player, game.away.offense, game.home.defense);
                game.away.players.push(player);
            }
        });
        games.push(game);
    });
    return games;
};
var getPlayers = function () { return getCSVData(playersFilename, function (err) { return console.log(err); }).then(function (data) { return parsePlayerData(data); }); };
var getOffense = function () { return getCSVData(teamOffenseFilename, function (err) { return console.log(err); }).then(function (data) { return parseOffensiveData(data); }); };
var getDeffense = function () { return getCSVData(teamDefenseFilename, function (err) { return console.log(err); }).then(function (data) { return parseDefensiveData(data); }); };
var getSchedule = function () { return getCSVData(scheduleFilename, function (err) { return console.log(err); }).then(function (data) { return parseSchedule(data); }); };
exports.getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var players, offense, defense, schedule, games;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Parsing Data');
                return [4 /*yield*/, getPlayers().then(function (data) { return data; })];
            case 1:
                players = _a.sent();
                return [4 /*yield*/, getOffense().then(function (data) { return data; })];
            case 2:
                offense = _a.sent();
                return [4 /*yield*/, getDeffense().then(function (data) { return data; })];
            case 3:
                defense = _a.sent();
                return [4 /*yield*/, getSchedule().then(function (data) { return data; })];
            case 4:
                schedule = _a.sent();
                console.log('Parsing Game Data');
                games = parseGameData(schedule, offense, defense, Object.values(players));
                console.log('Data Parsing Complete');
                return [2 /*return*/, { players: Object.values(players), teams: createTeams(Object.values(offense), Object.values(defense)), games: games }];
        }
    });
}); };
