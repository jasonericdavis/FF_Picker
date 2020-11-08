///<referrence path='lib/index.d.ts' />
const fs = require('fs').promises;
// const path = require('path')
// const nicknames = require('./nicknames.json')
//import {promises as fs} from 'fs'
import path from 'path'
import nicknames from './nicknames'
import parseGameData from './parseGameData'
import parsePlayerData from './parsePlayerData'

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

const playersFilename = 'pfW7Players.csv'
const teamOffenseFilename = 'pfW7TeamOffense.csv'
const teamDefenseFilename = 'pfW7TeamDefense.csv'
const scheduleFilename = 'pfSchedule.csv'


const parseOffensiveData = (data):{[key:string]: Offense} => {
    let lines = data.split('\n')
    let columns = {};
    let offenses:{[key:string]: Offense} = {};

    lines.map((line, index) => {
        // the first line contains the keys
        const cols = line.split(',')
        if(index < 1) {
            cols.map((col, colIndex) => {
                let tempColName = col
                let colNameCounter = 0

                /**  
                 * Because the name of a column can appear multiple times in the list of columns
                 * this logic will append a suffix to the column if it is already in the list of columns
                 * */ 
                while(columns[`${tempColName}`]) {
                    colNameCounter += 1
                    tempColName = `${tempColName.replace(`_${colNameCounter - 1}`, '')}_${colNameCounter}`             
                } 
                columns[tempColName ] = colIndex
            })
            return
        } else { 
            let newOffense: Offense = {
                team: cols[columns['Tm']],
                passingCompletions: Number(cols[columns['Cmp']]),
                passingAttempts: Number(cols[columns['Att']]),
                passingYards: Number(cols[columns['Yds_1']]),
                passingTouchdowns: Number(cols[columns['TD']]),
                interceptions: Number(cols[columns['Int']]),
                rushingAttempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_2']]),
                rushingTouchdowns: Number(cols[columns['TD_1']]),
                passingRank: lines.length,
                rushingRank: lines.length
            }
            offenses[ newOffense.team] = newOffense
        }
    })

    Object.values(offenses).map( offense => {
        offense.passingRank = Object.values(offenses).filter(
            x => x.passingYards > offense.passingYards).length + 1
        offense.rushingRank = Object.values(offenses).filter(
            x => x.rushingYards > offense.rushingYards).length + 1
    })
    return offenses
}

const parseDefensiveData = (data):{[key:string]: Defense} => {
    let lines = data.split('\n')
    let columns = {};
    let defenses:{[key:string]: Defense} = {};

    lines.map((line, index) => {
        // the first line contains the keys
        const cols = line.split(',')
        if(index < 1) {
            cols.map((col, colIndex) => {
                let tempColName = col
                let colNameCounter = 0

                /**  
                 * Because the name of a column can appear multiple times in the list of columns
                 * this logic will append a suffix to the column if it is already in the list of columns
                 * */ 
                while(columns[`${tempColName}`]) {
                    colNameCounter += 1
                    tempColName = `${tempColName.replace(`_${colNameCounter - 1}`, '')}_${colNameCounter}`             
                } 
                columns[tempColName ] = colIndex
            })
            // console.log(columns)
            return
        } else { 
            let newDefense:Defense = {
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
            }
            defenses[newDefense.team] = newDefense
        }
    })
    return defenses
}

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
    const filepath = path.join(process.cwd(), 'data', filename)
    console.log(`Reading CSV file: ${filepath}`)
    return await fs.readFile(filepath, 'utf8', callback)
}

const getPlayers =  () => getCSVData(playersFilename, (err) => console.log(err)).then((data) => parsePlayerData(data));
const getOffense = () => getCSVData(teamOffenseFilename, (err) => console.log(err)).then(data => parseOffensiveData(data));
const getDeffense = () => getCSVData(teamDefenseFilename, (err) => console.log(err)).then(data => parseDefensiveData(data));
const getSchedule = () => getCSVData(scheduleFilename, (err) => console.log(err)).then(data => getScheduledGames(data, '8'));

export const getData = async () => {
    console.log('Parsing Data')
    const players = await getPlayers().then(data => data)
    const offense = await getOffense().then(data => data)
    const defense = await getDeffense().then(data => data)
    const scheduledGames = await getSchedule().then(data => data)

    console.log('Parsing Game Data')
    const games = parseGameData(scheduledGames, offense, defense, Object.values(players))

    console.log('Data Parsing Complete')
    return {players: Object.values(players), teams: createTeams(Object.values(offense), Object.values(defense)), games}
}
