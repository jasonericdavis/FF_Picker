import {Defense} from './types'
import { createStatPointer } from './util'

export const createDefenseFromStats = (stats: string[], statPtr: {[key:string]:number}): Defense => {
    return {
        team: stats[statPtr['Tm']],
        gamesPlayed: parseInt(stats[statPtr['G']], 10),
        pointsAllowed: Number(stats[statPtr['PF']]),
        totalYards: Number(stats[statPtr['Yds']]),
        takeAways: Number(stats[statPtr['TO']]),
        fumbles: Number(stats[statPtr['FL']]),
        passingAttempts: Number(stats[statPtr['Att']]),
        interceptions: Number(stats[statPtr['Int']]),
        passingYards: Number(stats[statPtr['Yds_1']]),
        passingTouchdowns: Number(stats[statPtr['TD']]),
        averagePassingYards: Number(stats[statPtr['Yds_1']]) / Number(stats[statPtr['G']]),
        rushingAttempts: Number(stats[statPtr['Att_1']]),
        rushingYards: Number(stats[statPtr['Yds_2']]),
        averageRushingYards: Number(stats[statPtr['Yds_2']]) / Number(stats[statPtr['G']]),
        rushingTouchdowns: Number(stats[statPtr['TD_1']]),
        averageTotalYards: Number(stats[statPtr['Yds']]) / Number(stats[statPtr['G']]),
        defensiveRank: Number(stats[statPtr['Rk']]),
        passingRank: Number(stats[statPtr['Rk']]),
        rushingRank: Number(stats[statPtr['Rk']])
    }
}


export const parseDefensiveData = (data:string):{[key:string]: Defense} => {
    let lines = data.split('\n')
    let statPtr:{[key:string]: number} = {};
    let defenses:{[key:string]: Defense} = {};

    lines.map((line, index) => {
        // the first line contains the keys
        const stats = line.split(',')
        if(line.startsWith('Rk')) {
            statPtr = createStatPointer(stats)
            return
        } 
        if(Object.keys(statPtr).length > 0) { 
            defenses[stats[statPtr['Tm']]] = createDefenseFromStats(stats, statPtr)
        }
    })
    return defenses
}

export default parseDefensiveData