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
        defensiveRank: statPtr['Rk'],
        passingRank: statPtr['Rk'],
        rushingRank: statPtr['Rk']
    }
}

export const calculateTeamRanks = (defenses:{[key:string]:Defense}) => {
    Object.values(defenses).map( defense => {
        defense.passingRank = Object.values(defenses).filter(
            x => x.passingYards > defense.passingYards).length + 1
        defense.rushingRank = Object.values(defenses).filter(
            x => x.rushingYards > defense.rushingYards).length + 1
        defense.defensiveRank = Object.values(defenses).filter(
            x => x.totalYards > defense.totalYards).length + 1
    })
    return defenses
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
            // cols.map((col, colIndex) => {
            //     let tempColName = col
            //     let colNameCounter = 0

            //     /**  
            //      * Because the name of a column can appear multiple times in the list of columns
            //      * this logic will append a suffix to the column if it is already in the list of columns
            //      * */ 
            //     while(columns[`${tempColName}`]) {
            //         colNameCounter += 1
            //         tempColName = `${tempColName.replace(`_${colNameCounter - 1}`, '')}_${colNameCounter}`             
            //     } 
            //     columns[tempColName ] = colIndex
            // })
            // console.log(columns)
            return
        } 
        if(Object.keys(statPtr).length > 0) { 
            defenses[stats[statPtr['Tm']]] = createDefenseFromStats(stats, statPtr)
        }
    })
    defenses = calculateTeamRanks(defenses)
    return defenses
}

export default parseDefensiveData