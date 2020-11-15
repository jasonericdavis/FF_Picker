import path from 'path'
import parseGameData from './parseGameData'
import parsePlayerData from './parsePlayerData'
import parseOffensiveData from './parseOffensiveData'
import parseDefensiveData from './parseDefensiveData'
import parseScheduledGamesData from './parseScheduledGamesData'
import getUnits from './getUnits'
import {getCSVData} from './util'

import {
    Offense,
    Defense,
    Team
} from 'shared-lib'

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

const getPlayers  = (folder) => getCSVData(path.join(folder, 'players.csv'), (err) => console.log(err)).then((data) => parsePlayerData(data));
const getOffense  = (folder) => getCSVData(path.join(folder, 'offense.csv'), (err) => console.log(err)).then(data => parseOffensiveData(data));
const getDeffense = (folder) => getCSVData(path.join(folder, 'defense.csv'), (err) => console.log(err)).then(data => parseDefensiveData(data));
const getSchedule = (scheduleFilename) => getCSVData(scheduleFilename, (err) => console.log(err)).then(data => parseScheduledGamesData(data, '8'));

export const getData = async (folder, scheduleFilename) => {
    console.log('Parsing Data')
    const players = await getPlayers(folder).then(data => data)
    const offenses = await getOffense(folder).then(data => data)
    const defenses = await getDeffense(folder).then(data => data)
    const scheduledGames = await getSchedule(scheduleFilename).then(data => data)
    
    const units = getUnits(Object.values(offenses), Object.values(defenses), Object.values(players))
    console.log(JSON.stringify(units))

    console.log('Parsing Game Data')
    const games = parseGameData(scheduledGames, offenses, defenses, Object.values(players))

    console.log('Data Parsing Complete')
    return {players: Object.values(players), teams: createTeams(Object.values(offenses), Object.values(defenses)), games, units}
}
