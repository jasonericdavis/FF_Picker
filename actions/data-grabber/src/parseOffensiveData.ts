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
        offensiveRank: statPtr['Rk'],
        passingRank: statPtr['Rk'],
        rushingRank: statPtr['Rk']
    }
}

export const calculateTeamRanks = (offenses:{[key:string]:Offense}) => {
    Object.values(offenses).map( offense => {
        offense.passingRank = Object.values(offenses).filter(
            x => x.passingYards > offense.passingYards).length + 1
        offense.rushingRank = Object.values(offenses).filter(
            x => x.rushingYards > offense.rushingYards).length + 1
        offense.offensiveRank = Object.values(offenses).filter(
            x => x.totalYards > offense.totalYards).length + 1
    })
    return offenses
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


    offenses = calculateTeamRanks(offenses)
    return offenses
}

export default parseOffensiveData