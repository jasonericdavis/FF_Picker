import {Defense} from 'shared-lib'

export const calculateTeamRanks = (defenses:{[key:string]:Defense}) => {
    Object.values(defenses).map( defense => {
        defense.passingRank = Object.values(defenses).filter(
            x => x.passingYards > defense.passingYards).length + 1
        defense.rushingRank = Object.values(defenses).filter(
            x => x.rushingYards > defense.rushingYards).length + 1
    })
    return defenses
}

export const parseDefensiveData = (data):{[key:string]: Defense} => {
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
                passingRank: lines.length,
                rushingRank: lines.length
            }
            defenses[newDefense.team] = newDefense
        }
    })
    defenses = calculateTeamRanks(defenses)
    return defenses
}

export default parseDefensiveData