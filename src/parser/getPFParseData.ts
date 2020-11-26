import path from 'path'
import parseGameData from './parseGameData'
import parsePlayerData from './parsePlayerData'
import parseOffensiveData from './parseOffensiveData'
import parseDefensiveData from './parseDefensiveData'
import parseScheduledGamesData from './parseScheduledGamesData'
import getUnits from './getUnits'
import {getCSVData} from './util'
import {Offense,Defense,Team, Player} from '../types'

/**
 * This method combines the offenses and defenses into an array
 * of objects that contain both the offense and defense for a particular team
 * @param {Dictionary[Offense]} offense a dictionary of the offenses
 * @param {Dictionary[Deffense]} defense a dictionary of the defenses
 * @returns {Dictionary[Team]} A dictionary with the respective teams
 */
export const createTeams = (offenses:{[key:string]: Offense}, defenses:{[key:string]: Defense}):{[key:string]:Team} => {
    const offensesArray:Array<Offense> = Object.values(offenses)
    const teams = {}
    offensesArray.map((offense) => {
        teams[offense.team] = {name: offense.team, offense, defense: defenses[offense.team]}
    })
    return teams
}

const getPlayers  = (folder) => getCSVData(path.join(folder, 'players.csv'), (err) => console.log(err)).then((data) => parsePlayerData(data));
const getOffense  = (folder) => getCSVData(path.join(folder, 'offense.csv'), (err) => console.log(err)).then(data => parseOffensiveData(data));
const getDeffense = (folder) => getCSVData(path.join(folder, 'defense.csv'), (err) => console.log(err)).then(data => parseDefensiveData(data));
const getSchedule = (scheduleFilename, week) => getCSVData(scheduleFilename, (err) => console.log(err)).then(data => parseScheduledGamesData(data, week));

export const getData = async (folder, scheduleFilename, week) => {
    console.log('Parsing Data')
    const players = await getPlayers(folder).then(data => data)
    const offenses = await getOffense(folder).then(data => data)
    const defenses = await getDeffense(folder).then(data => data)
    const scheduledGames = await getSchedule(scheduleFilename, week).then(data => data)
    
    console.log('Creating Units')
    const units = getUnits(Object.values(offenses), Object.values(defenses), Object.values(players))

    console.log('Creating Teams')
    const teams = createTeams(offenses,defenses)

    console.log('Creating Game Data')
    const games = parseGameData(scheduledGames, teams, players, units)

    console.log('Data Parsing Complete')
    return {players: players, teams, games, units}
}
