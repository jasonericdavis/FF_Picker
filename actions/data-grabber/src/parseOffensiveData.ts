import {Offense} from './types'

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
    let columns: any = {};
    let offenses:{[key:string]: Offense} = {};
    

    lines.map((line, index) => {
        // the first line contains the keys
        const cols:any = line.split(',')
        if(line.startsWith('Rk')) {
            cols.map((col:string, colIndex:number) => {
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
        } 
        if(Object.keys(columns).length > 0) { 
            let newOffense: Offense = {
                team: cols[columns['Tm']],
                totalYards: Number(cols[columns['Yds']]),
                passingCompletions: Number(cols[columns['Cmp']]),
                passingAttempts: Number(cols[columns['Att']]),
                passingYards: Number(cols[columns['Yds_1']]),
                passingTouchdowns: Number(cols[columns['TD']]),
                interceptions: Number(cols[columns['Int']]),
                rushingAttempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_2']]),
                rushingTouchdowns: Number(cols[columns['TD_1']]),
                offensiveRank: lines.length,
                passingRank: lines.length,
                rushingRank: lines.length
            }
            offenses[ newOffense.team] = newOffense
        }
    })


    offenses = calculateTeamRanks(offenses)
    return offenses
}

export default parseOffensiveData