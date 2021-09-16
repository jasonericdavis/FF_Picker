import nicknames from './nicknames'
import {Player} from './types'

export const parsePlayerData = (data: string): {[key: string]: Player} => {
    let lines = data.split('\n')
    let columns:any = {};
    let players: any = {};

    lines.map((line, index) => {
        const cols = line.split(',')
        if(line.startsWith('Rk')) {
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
        } 

    // If the columsn have been populated then we can begin to parse the data
        if(Object.keys(columns).length > 0) { 
            //use the columns to create an object for each player and push into array
            let newPlayer: Player = {
                name: cols[columns['Player']].split('\\')[0],
                id: cols[columns['Player']].split('\\')[1],
                position: cols[columns['FantPos']],
                fantasyPoints: Number(cols[columns['FantPt']]),
                team: nicknames[cols[columns['Tm']]],
                teamAbbr: cols[columns['Tm']],
                passingAttempts: Number(cols[columns['Att']]),
                passingCompletions: Number(cols[columns['Cmp']]),
                passingYards:Number(cols[columns['Yds']]),
                passingTouchdowns: Number(cols[columns['TD']]),
                passingInterceptions: Number(cols[columns['Int']]),
                rushingAttempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_1']]),
                rushingAverage: Number(cols[columns['Y/A']]),
                rushingTouchdowns: Number(cols[columns['TD_1']]),
                receivingTargets:Number(cols[columns['Tgt']]),
                receivingReceptions: Number(cols[columns['Rec']]),
                receivingYards: Number(cols[columns['Yds_2']]),
                receivingAverage: Number(cols[columns['Y/R']]),
                receivingTouchdowns: Number(cols[columns['TD_2']])
            }
            players[newPlayer['id']] = newPlayer
        }
})
    return players
}

export default parsePlayerData