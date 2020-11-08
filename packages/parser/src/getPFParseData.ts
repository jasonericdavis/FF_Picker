const fs = require('fs').promises;
import path from 'path'
import parseGameData from './parseGameData'
import parsePlayerData from './parsePlayerData'
import parseOffensiveData from './parseOffensiveData'
import parseDefensiveData from './parseDefensiveData'

import {
    Player,
    Offense,
    Defense,
    Team,
    Game,
    GameRatios,
    ScheduledGame,
    PlayerRatios
} from 'shared-lib/src/index'

/**
 * This method combines the offenses and defenses into an array
 * of objects that contain both the offense and defense for a particular team
 * @param {Object.<string, offense>} offense The offenses to be combined
 * @param {Dictionary[Deffense]} defense The offenses to be combined
 * @returns {Team[]} An array with the Team objects
 */
export const createTeams = (offenses:Array<Offense>, defenses:Array<Defense>):Array<Team> => {
    const offensesArray:Array<Offense> = Object.values(offenses)
    const teams:Array<Team> = []
    offensesArray.map((offense) => {
        teams.push({name: offense.team, offense, defense: defenses.filter(def => def.team == offense.team)[0]})
    })
    return teams
}

/**
 * This method parses the schedule from the csv data 
 * and returns a subset of the schedule for a particular week
 * @param {string} data The csv data of the schedule
 * @param {string} week The week number of games to retreive
 * @return {ScheduledGame[]} An array of ScheduledGame objects
 */
const getScheduledGames = (data, week):Array<ScheduledGame> => {
    const lines = data.split('\n')
    const scheduledGames: Array<ScheduledGame> = [];
    lines.map((line) => {
        const cols = line.split(',')
        
        // If its not the week we are looking for skip
        if(cols[0] != week) return
        
        scheduledGames.push({
            home: cols[6],
            away: cols[4],
            date: cols[2],
            kickoff: cols[3]
        })   
    })
    return scheduledGames
}

const getCSVData =  async (filename, callback) => { 
    console.log(`Reading CSV file: ${filename}`)
    return await fs.readFile(filename, 'utf8', callback)
}

const getPlayers  = (folder) => getCSVData(path.join(folder, 'players.csv'), (err) => console.log(err)).then((data) => parsePlayerData(data));
const getOffense  = (folder) => getCSVData(path.join(folder, 'offense.csv'), (err) => console.log(err)).then(data => parseOffensiveData(data));
const getDeffense = (folder) => getCSVData(path.join(folder, 'defense.csv'), (err) => console.log(err)).then(data => parseDefensiveData(data));
const getSchedule = (scheduleFilename) => getCSVData(scheduleFilename, (err) => console.log(err)).then(data => getScheduledGames(data, '8'));

export const getData = async (folder, scheduleFilename) => {
    console.log('Parsing Data')
    const players = await getPlayers(folder).then(data => data)
    const offense = await getOffense(folder).then(data => data)
    const defense = await getDeffense(folder).then(data => data)
    const scheduledGames = await getSchedule(scheduleFilename).then(data => data)

    console.log('Parsing Game Data')
    const games = parseGameData(scheduledGames, offense, defense, Object.values(players))

    console.log('Data Parsing Complete')
    return {players: Object.values(players), teams: createTeams(Object.values(offense), Object.values(defense)), games}
}
