import {Offense} from './types'
import { createStatPointer } from './util'

export const createOffenseFromStats = (stats: string[], statPtr: {[key:string]:number}): Offense => {
    return {
        team: stats[statPtr['Tm']],
        gamesPlayed: parseInt(stats[statPtr['G']], 10),
        totalYards: Number(stats[statPtr['Yds']]),
        passingCompletions: Number(stats[statPtr['Cmp']]),
        passingAttempts: Number(stats[statPtr['Att']]),
        passingYards: Number(stats[statPtr['Yds_1']]),
        passingTouchdowns: Number(stats[statPtr['TD']]),
        interceptions: Number(stats[statPtr['Int']]),
        rushingAttempts: Number(stats[statPtr['Att_1']]),
        rushingYards: Number(stats[statPtr['Yds_2']]),
        rushingTouchdowns: Number(stats[statPtr['TD_1']]),
        averagePassingYards: Number(stats[statPtr['Yds_1']]) / Number(stats[statPtr['G']]),
        averageRushingYards: Number(stats[statPtr['Yds_2']]) / Number(stats[statPtr['G']]),
        averageTotalYards: Number(stats[statPtr['Yds']]) / Number(stats[statPtr['G']]),
        offensiveRank: Number(stats[statPtr['Rk']]),
        passingRank: Number(stats[statPtr['Rk']]),
        rushingRank: Number(stats[statPtr['Rk']])
    }
}

export const parseOffensiveData = (data:string):{[key:string]: Offense} => {
    let lines = data.split('\n')
    let statPtr:{[key:string]: number} = {};
    let offenses:{[key:string]: Offense} = {};
    

    lines.map((line, index) => {
        // the first line contains the keys
        const stats = line.split(',')
        if(line.startsWith('Rk')) {
            statPtr = createStatPointer(stats)
            return
        } 
        if(Object.keys(statPtr).length > 0) { 
            offenses[ stats[statPtr['Tm']]] = createOffenseFromStats(stats, statPtr)
        }
    })
    return offenses
}

export default parseOffensiveData