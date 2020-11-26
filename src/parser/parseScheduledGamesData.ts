import {ScheduledGame} from '../types'

/**
 * This method parses the schedule from the csv data 
 * and returns a subset of the schedule for a particular week
 * @param {string} data The csv data of the schedule
 * @param {string} week The week number of games to retreive
 * @return {ScheduledGame[]} An array of ScheduledGame objects
 */
export const parseScheduledGamesData = (data, week):Array<ScheduledGame> => {
    const lines = data.split('\n')
    const scheduledGames: Array<ScheduledGame> = [];
    lines.map((line) => {
        const cols = line.split(',')
        
        // If its not the week we are looking for skip
        if(cols[0].trim() != week) return
        
        scheduledGames.push({
            home: cols[6],
            away: cols[4],
            date: cols[2],
            kickoff: cols[3]
        })   
    })
    return scheduledGames
}

export default parseScheduledGamesData