import nicknames from './nicknames'
import { createStatPointer } from './util'
import {Player} from './types'

export const createPlayerFromStats = (
    stats: string[], 
    statPtr: {[key:string]:number},
    teams: Array<{name: string, id: string}>)
: Player => {  
    const playerTeam = teams.find(t => t.name === nicknames[stats[statPtr['Tm']]]) || {id: null}    
    return {
        name: stats[statPtr['Player']].split('\\')[0],
        id: stats[statPtr['Player']].split('\\')[1],
        games: Number(stats[statPtr['G']]),
        position: stats[statPtr['FantPos']],
        fantasyPoints: Number(stats[statPtr['FantPt']]),
        team: nicknames[stats[statPtr['Tm']]],
        teamId: playerTeam.id,
        teamAbbr: stats[statPtr['Tm']],
        passingAttempts: Number(stats[statPtr['Att']]),
        passingCompletions: Number(stats[statPtr['Cmp']]),
        passingYards:Number(stats[statPtr['Yds']]),
        passingYardsPerGame: Number(stats[statPtr['Yds']])/ Number(stats[statPtr['G']]),
        passingTouchdowns: Number(stats[statPtr['TD']]),
        passingInterceptions: Number(stats[statPtr['Int']]),
        rushingAttempts: Number(stats[statPtr['Att_1']]),
        rushingYards: Number(stats[statPtr['Yds_1']]),
        rushingYardsPerGame: Number(stats[statPtr['Yds_1']])/ Number(stats[statPtr['G']]),
        rushingAverage: Number(stats[statPtr['Y/A']]),
        rushingTouchdowns: Number(stats[statPtr['TD_1']]),
        receivingTargets:Number(stats[statPtr['Tgt']]),
        receivingReceptions: Number(stats[statPtr['Rec']]),
        receivingYards: Number(stats[statPtr['Yds_2']]),
        receivingYardsPerGame: Number(stats[statPtr['Yds_2']])/ Number(stats[statPtr['G']]),
        receivingAverage: Number(stats[statPtr['Y/R']]),
        receivingTouchdowns: Number(stats[statPtr['TD_2']])
    }
}

export const parsePlayerData = (data: string, teams: Array<{name: string, id: string}>): {[key: string]: Player} => {
    let lines = data.split('\n')
    let statPtr:any = {};
    let players: any = {};

    lines.map((line, index) => {
        const stats = line.split(',')
        if(line.startsWith('Rk')) {
            statPtr = createStatPointer(stats)
            return
        } 

        // If the columns have been populated then we can begin to parse the data
        if(Object.keys(statPtr).length > 0) { 
            //use the columns to create an object for each player and push into array
            let player = createPlayerFromStats(stats, statPtr, teams)
            players[player.name] = player
        }
})
    return players
}

export default parsePlayerData