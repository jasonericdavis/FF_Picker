import getCSVData from './getCSVData'
const ignoreColumns = ['Name + ID', 'ID', 'Roster Position']

const fileUrl = '/DKw2Early.csv'
export const parseData = (data) => {
    let lines = data.split('\n')
    let columns = {};
    let players = [];
    let matchups = {}

    lines.map((line, index) => {
        // the first line contains the keys
        const cols = line.split(',')
        if(index < 1) {
            cols.map((col, index) => {
                //if(ignoreColumns.includes(col)) return
                columns[index] = col
            })
            return
        } else {
            //use the columns to create an object for each player and push into array
            let player = {}
            cols.map((col, index) => {
                if(ignoreColumns.includes(columns[index])) return
                player[columns[index]] = col    
            })

            // this will create the opponent by parsing a very specific string of T1@T2<space>DateTime
            const opp = player['Game Info'] 
                ? player['Game Info'].replace(player['TeamAbbrev'], '').replace('@', '').split(' ')[0] 
                : "TBA"
            player['Opponent'] = opp;
            players.push(player)

            // if the matchup doesn't exist then create the object and add current player
            if(!matchups[player['TeamAbbrev']]) matchups[player['TeamAbbrev']] = {}
            //matchups[player['TeamAbbrev']].push(player)
            if(!matchups[player['TeamAbbrev']][player['Position']]) matchups[player['TeamAbbrev']][player['Position']] = []
            matchups[player['TeamAbbrev']][player['Position']].push(index)

        }
})
    return {qbs: players}
}

export default () => getCSVData(fileUrl).then(data => parseData(data))