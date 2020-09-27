import getCSVData from './getCSVData'

const fileUrl = '/pfr.csv'
const ignoreColumns = [];

const extractPlayerName = (cols, columns) => cols[columns['Player']].split('\\')[0]
const extractPlayerId = (cols, columns) => cols[columns['Player']].split('\\')[1]
const extractPositionColumns = (player, positionColumns, cols, columns) => {
    for (const outputColumn in positionColumns) {
        /**
         * This is probably some premature optimization but what I am doing
         * here is defining the columns to look for in qbCols 
         */
        let lookupColumn = positionColumns[outputColumn]
        let lookupIndex = columns[lookupColumn]
        player[outputColumn] = cols[lookupIndex]
    }0
    return player;
}
const qbCols = {
    'Completions': 'Cmp',
    'Attempts': 'Att',
    'Yards':'Yds',
    'Touchdowns': 'Td',
    'Int': 'Int'
}

const rbCols = {
    'Attempts': 'Att_1',
    'Yards': 'Yds_1',
    'Average': 'Y/A',
    'Touchdowns': 'TD_1'
}

const recieverCols = {
    'Targets':'Tgt',
    'Receptions': 'Rec',
    'Yards': 'Yards_2',
    'Average': 'Y/R',
    'Touchdowns': 'TD_2'
}

export const parseData = (data) => {
    let lines = data.split('\n')
    let columns = {};
    let players = [];
    let matchups = {}
    let qbs = [];
    let rbs = [];
    let wrs = [];
    let tes = [];

    lines.map((line, index) => {
        // the first line contains the keys
        const cols = line.split(',')
        if(index < 1) {
            cols.map((col, colIndex) => {
                let tempColName = col
                let colNameCounter = 0
                while(columns[`${tempColName}`]) {
                    colNameCounter += 1
                    tempColName = `${tempColName.replace(`_${colNameCounter - 1}`, '')}_${colNameCounter}`             
                } 
                columns[tempColName ] = colIndex
            })
            console.log(columns)
            return
        } else { 
            //use the columns to create an object for each player and push into array
            let player = {}
            // cols.map((col, index) => {
            //     if(ignoreColumns.includes(columns[index])) return
            //     //player[columns[index]] = col 
            //     player   
            // })

            let newPlayer = {}
            newPlayer['Name'] = extractPlayerName(cols, columns)
            newPlayer['Id'] = extractPlayerId(cols, columns)
            newPlayer['Position'] = cols[columns['FantPos']]
            newPlayer['FantasyPoints'] = cols[columns['FantPt']]

            if(newPlayer['Position'] === 'QB') {         
                // for (const outputColumn in qbCols) {
                //     /**
                //      * This is probably some premature optimization but what I am doing
                //      * here is defining the columns to look for in qbCols 
                //      */
                //     newPlayer[outputColumn] = cols[columns[qbCols[outputColumn]]]
                // }
                // qbs.push(newPlayer)
                qbs.push(
                    extractPositionColumns(newPlayer, qbCols, cols, columns)
                )
                return;
            }

            if(newPlayer['Position'] === 'RB') {         
                rbs.push(
                    extractPositionColumns(newPlayer, rbCols, cols, columns)
                )
                return;
            }

            if(newPlayer['Position'] === 'WR') {         
                wrs.push(
                    extractPositionColumns(newPlayer, recieverCols, cols, columns)
                )
                return;
            }

            if(newPlayer['Position'] === 'TE') {         
                tes.push(
                    extractPositionColumns(newPlayer, recieverCols, cols, columns)
                )
                return;
            }

            // // this will create the opponent by parsing a very specific string of T1@T2<space>DateTime
            // const opp = player['Game Info'] 
            //     ? player['Game Info'].replace(player['TeamAbbrev'], '').replace('@', '').split(' ')[0] 
            //     : "TBA"
            // player['Opponent'] = opp;
            // players.push(player)

            // // if the matchup doesn't exist then create the object and add current player
            // if(!matchups[player['TeamAbbrev']]) matchups[player['TeamAbbrev']] = {}
            // //matchups[player['TeamAbbrev']].push(player)
            // if(!matchups[player['TeamAbbrev']][player['Position']]) matchups[player['TeamAbbrev']][player['Position']] = []
            // matchups[player['TeamAbbrev']][player['Position']].push(index)

        }
})
    return {qbs, rbs, wrs, tes}
}

export default () => getCSVData(fileUrl).then(data => parseData(data))