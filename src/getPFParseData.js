//import getCSVData from './getCSVData'
const fs = require('fs').promises;
const path = require('path')
const nicknames = require('./nicknames.json')

const playersFilename = 'pfW5Players.csv'
const teamOffenseFilename = 'pfW5TeamOffense.csv'
const teamDefenseFilename = 'pfW5TeamDefense.csv'
const scheduleFilename = 'pfSchedule.csv'
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
    'Yards': 'Yds_2',
    'Average': 'Y/R',
    'Touchdowns': 'TD_2'
}

const statColumns = {
    'Completions': 'Cmp',
    'PassingAttempts': 'Att',
    'PassingYards':'Yds',
    'PassingTouchdowns': 'Td',
    'Int': 'Int',
    'Attempts': 'Att_1',
    'RushingYards': 'Yds_1',
    'RushingAverage': 'Y/A',
    'RushingTouchdowns': 'TD_1',
    'Targets':'Tgt',
    'Receptions': 'Rec',
    'ReceivingYards': 'Yds_2',
    'ReceivingAverage': 'Y/R',
    'ReceivingTouchdowns': 'TD_2'
}

const parsePlayerData = (data) => {
    let lines = data.split('\n')
    let columns = {};
    let players = {};
    let matchups = {}
    let qbs = {};
    let rbs = {};
    let wrs = {};
    let tes = {};

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
            newPlayer['Team'] = cols[columns['Tm']]
            newPlayer['TeamNickname'] = nicknames[newPlayer['Team']]
            players[newPlayer['Id']] = extractPositionColumns(newPlayer, statColumns, cols, columns)

            // if(newPlayer['Position'] === 'QB') {         
            //     qbs[newPlayer['Id']] =
            //         extractPositionColumns(newPlayer, qbCols, cols, columns)
            //     return;
            // }

            // if(newPlayer['Position'] === 'RB') {         
            //     rbs[newPlayer['Id']] =
            //         extractPositionColumns(newPlayer, rbCols, cols, columns)
            //     return;
            // }

            // if(newPlayer['Position'] === 'WR') {         
            //     wrs[newPlayer['Id']] =
            //         extractPositionColumns(newPlayer, recieverCols, cols, columns)
            //     return;
            // }

            // if(newPlayer['Position'] === 'TE') {         
            //     tes[newPlayer['Id']] = 
            //         extractPositionColumns(newPlayer, recieverCols, cols, columns)
            //     return;
            // }

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
    return players
}

const parseOffensiveData = (data) => {
    let lines = data.split('\n')
    let columns = {};
    let offenses = {};

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
            let newOffense = {}
            newOffense['Team'] = cols[columns['Tm']]
            newOffense['PassingCompletions'] = Number(cols[columns['Cmp']])
            newOffense['PassingAttempts'] = Number(cols[columns['Att']])
            newOffense['PassingYards'] = Number(cols[columns['Yds_1']])
            newOffense['PassingTouchdowns'] = Number(cols[columns['TD']])
            newOffense['Interceptions'] = Number(cols[columns['Int']])
            newOffense['RushingAttempts'] = Number(cols[columns['Att_1']])
            newOffense['RushingYards'] = Number(cols[columns['Yds_2']])
            newOffense['RushingTouchdowns'] = Number(cols[columns['TD_1']])
            offenses[ newOffense['Team']] = newOffense
        }
    })
    return offenses
}

const parseDefensiveData = (data) => {
    let lines = data.split('\n')
    let columns = {};
    let defenses = {};

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
            let newDefense = {}
            newDefense['Team'] = cols[columns['Tm']]
            newDefense['PointsAllowed'] = Number(cols[columns['PF']])
            newDefense['TotalYards'] = Number(cols[columns['Yds']])
            newDefense['TakeAways'] = Number(cols[columns['TO']])
            newDefense['Fumbles'] = Number(cols[columns['FL']])
            newDefense['PassingAttempts'] = Number(cols[columns['Att']])
            newDefense['Interceptions'] = Number(cols[columns['Int']])
            newDefense['PassingYards'] = Number(cols[columns['Yds_1']])
            newDefense['PassingTouchdowns'] = Number(cols[columns['TD']])
            newDefense['RushingAttempts'] = Number(cols[columns['Att_1']])
            newDefense['RushingYards'] = Number(cols[columns['Yds_2']])
            newDefense['RushingTouchdowns'] = Number(cols[columns['TD_1']])
            defenses[newDefense['Team']] = newDefense
        }
    })
    return defenses
}

const parseSchedule = data => {
    const week = '5'
    const lines = data.split('\n')
    const games = [];
    lines.map((line, index) => {
        const cols = line.split(',')
        
        // If its not the week we are looking for skip
        if(cols[0] != week) return
        
        games.push({
            home: cols[4],
            away: cols[6]
        })   
    })
    return games
}

const getCSVData =  async (filename, callback) => {
    console.log(`Reading CSV file: ${filename}`)
    const filepath = path.join(process.cwd(), 'data', filename)
    return await fs.readFile(filepath, 'utf8')
}

const calculatePlayerRatios = (players, offense) => {
    Object.values(players).map(player => {
        console.log(`Geting Ratios for ${player.Name}`)
        const playerStat = Number(player['PassingYards']) + Number(player['RushingYards']) + Number(player['ReceivingYards'])
        const teamStat = Number(offense[player['TeamNickname']].PassingYards) + Number(offense[player['TeamNickname']].RushingYards)
        console.log(`${player.Name} | ${playerStat} | ${teamStat}`)
        player.Ratio = (playerStat/teamStat)
    })
}

const parseGameData = (schedule, offense, defense, players) => {
    let games = []
    schedule.map((scheduledGame) => {
        let game = {...scheduledGame}
        const hOffense = offense[game.home]
        const aOffense = offense[game.away]
        const hDefense = defense[game.home]
        const aDefense = defense[game.away]

        game.Home = {Offense: {...hOffense}, Defense: {...hDefense}}
        game.Away = {Offense: {...aOffense}, Defense: {...aDefense}} 

        // Add game ratios
        const hOffenseYards = 
            hOffense.PassingYards + hOffense.RushingYards
        const aOffenseYards = 
            aOffense.PassingYards + hOffense.PassingYards
        
        const hDefenseYards = 
            hDefense.PassingYards + hDefense.RushingYards
        const aDefenseYards = 
            aDefense.PassingYards + aDefense.PassingYards

        // game.HomeOffensiveYards = hOffenseYards
        // game.AwayOffensiveYards = aOffenseYards
        // game.HomeDefensiveYards = hDefenseYards
        // game.AwayDefensiveYards = aDefenseYards
        game.Ratios = {
            HomeOffense: hDefenseYards/aOffenseYards,
            HomeDefensive: aOffenseYards/hDefenseYards,
            AwayOffense: aDefenseYards/hOffenseYards,
            AwayDefensive: hOffenseYards/aDefenseYards
        }

        // Add the player information to the game
        game.Home.Players = []
        game.Away.Players = []

        // filter to create an array containing only the players that play for the teams
        // that are participating in the game
        const gamePlayers = players.filter(player => (
            player.TeamNickname === game.home || player.TeamNickname === game.away
        ))

        gamePlayers.map(player => {
            player.TeamNickname === game.home? game.Home.Players.push(player) : game.Away.Players.push(player)
        })

        games.push(game)
    })
    return games
}

const getPlayers =  () => getCSVData(playersFilename).then(data => parsePlayerData(data));
const getOffense = () => getCSVData(teamOffenseFilename).then(data => parseOffensiveData(data));
const getDeffense = () => getCSVData(teamDefenseFilename).then(data => parseDefensiveData(data));
const getSchedule = () => getCSVData(scheduleFilename).then(data => parseSchedule(data));

exports.getData = async () => {
    console.log('Parsing Data')
    const players = await getPlayers().then(data => data)
    const offense = await getOffense().then(data => data)
    const defense = await getDeffense().then(data => data)
    const schedule = await getSchedule().then(data => data)

    console.log('Calculating Player Ratios')
    calculatePlayerRatios(players, offense, '')

    console.log('Calculating Team Ratios')
    const games = parseGameData(schedule, offense, defense, Object.values(players))

    console.log('Data Parsing Complete')
    return {players, offense, defense, schedule, games, nicknames}
}