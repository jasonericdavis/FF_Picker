const fs = require('fs').promises;
const path = require('path')

const playersFilename = 'pfW5Players.csv'
const teamOffenseFilename = 'pfW5TeamOffense.csv'
const teamDefenseFilename = 'pfW5TeamDefense.csv'
const scheduleFilename = 'pfSchedule.csv'

interface Player {
    attempts: number,
    completions: number,
    fantasyPoints: number,
    id: string,
    int: number,
    name: string,
    passingAttempts: number,
    passingTouchdowns: number,
    passingYards: number,
    position: string,
    receivingAverage: number,
    receivingTouchdowns: number,
    receivingYards: number,
    receptions: number,
    rushingAverage: number,
    rushingTouchdowns: number,
    rushingYards: number,
    targets: number,
    team: string,
    teamNickname: string,
    ratios?: PlayerRatios,
}

interface PlayerRatios {
    Defense: number,
    Offensive: number,
    Passing: number,
    Rushing: number
}

interface Defense {
    fumbles: number,
    interceptions: number,
    passingAttempts: number,
    passingTouchdowns: number,
    passingYards: number,
    pointsAllowed: number,
    rushingAttempts: number,
    rushingTouchdowns: number,
    rushingYards: number,
    takeAways: number,
    team: string,
    totalYards: number,
}

interface Offense {
    interceptions: number,
    passingAttempts: number,
    passingCompletions: number,
    passingTouchdowns: number,
    passingYards: number,
    rushingAttempts: number,
    rushingTouchdowns: number,
    rushingYards: number,
    team: string
}

interface Team {
    name: string,
    offense: Offense,
    defense: Defense,
    players?: Array<Player>
}

interface GameRatios {
    AwayDefensive: number,
    AwayOffense: number,
    AwayPassingDefense: number,
    AwayPassingOffense: number,
    AwayRushingDefense: number,
    AwayRushingYards: number,
    HomeDefensive: number,
    HomeOffense: number,
    HomePassingDefense: number,
    HomePassingOffense: number,
    HomeRushingDefense: number,
    HomeRushingYards: number
}

interface Game {
    homeTeamName: string,
    awayTeamName: string,
    home: Team,
    away: Team,
    ratios: GameRatios
}

const parsePlayerData = (data): {[key: string]: Player} => {
    let lines = data.split('\n')
    let columns = {};
    let players = {};

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
            let newPlayer:Player = {
                name: cols[columns['Player']].split('\\')[0],
                id: cols[columns['Player']].split('\\')[1],
                position: cols[columns['FantPos']],
                fantasyPoints: Number(cols[columns['FantPt']]),
                team: cols[columns['Tm']],
                teamNickname: cols[columns['Tm']],
                completions: cols[columns['Cmp']],
                passingAttempts: cols[columns['Att']],
                passingYards:cols[columns['Yds']],
                passingTouchdowns: cols[columns['Td']],
                int: cols[columns['Int']],
                attempts: cols[columns['Att_1']],
                rushingYards: cols[columns['Yds_1']],
                rushingAverage: cols[columns['Y/A']],
                rushingTouchdowns: cols[columns['TD_1']],
                targets:cols[columns['Tgt']],
                receptions: cols[columns['Rec']],
                receivingYards: cols[columns['Yds_2']],
                receivingAverage: cols[columns['Y/R']],
                receivingTouchdowns: cols[columns['TD_2']]
            }
            players[newPlayer['id']] = newPlayer
        }
})
    return players
}

const parseOffensiveData = (data):{[key:string]: Offense} => {
    let lines = data.split('\n')
    let columns = {};
    let offenses:{[key:string]: Offense} = {};

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
            return
        } else { 
            let newOffense: Offense = {
                team: cols[columns['Tm']],
                passingCompletions: Number(cols[columns['Cmp']]),
                passingAttempts: Number(cols[columns['Att']]),
                passingYards: Number(cols[columns['Yds_1']]),
                passingTouchdowns: Number(cols[columns['TD']]),
                interceptions: Number(cols[columns['Int']]),
                rushingAttempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_2']]),
                rushingTouchdowns: Number(cols[columns['TD_1']])
            }
            offenses[ newOffense.team] = newOffense
        }
    })
    return offenses
}

const parseDefensiveData = (data):{[key:string]: Defense} => {
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
            }
            defenses[newDefense.team] = newDefense
        }
    })
    return defenses
}

/**
 * This method combines the offenses and defenses into an array
 * of objects that contain both the offense and defense for a particular team
 * @param {Object.<string, offense>} offense The offenses to be combined
 * @param {Dictionary[Deffense]} defense The offenses to be combined
 * @returns {Team[]} An array with the Team objects
 */
const createTeams = (offenses:Array<Offense>, defenses:Array<Defense>):Array<Team> => {
    const offensesArray:Array<Offense> = Object.values(offenses)
    const teams:Array<Team> = []
    offensesArray.map((offense) => {
        teams.push({name: offense.team, offense, defense: defenses.filter(def => def.team == offense.team)[0]})
    })
    return teams
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
    const filepath = path.join(process.cwd(), '../data', filename)
    console.log(`Reading CSV file: ${filepath}`)
    return await fs.readFile(filepath, 'utf8', callback)
}

const calculatePlayerRatios = (player, offense, defense) => {
    const playerStat = player.PassingYards + player.RushingYards + player.ReceivingYards
    const teamOffense = offense.PassingYards + offense.RushingYards
    const teamDefense = defense.PassingYards + defense.RushingYards
    const Ratio ={
        Offensive: playerStat/teamOffense,
        Passing: player.PassingYards/defense.PassingYards,
        Rushing: player.RushingYards/defense.RushingYards,
        Defense: playerStat/teamDefense
    }
    return {...player, Ratio}
}

const parseGameData = (schedule, offense, defense, players) => {
    let games = []
    schedule.map((scheduledGame) => {
        let game = {...scheduledGame}
        const hOffense = offense[game.home]
        const aOffense = offense[game.away]
        const hDefense = defense[game.home]
        const aDefense = defense[game.away]

        game.home = {Offense: {...hOffense}, Defense: {...hDefense}}
        game.away = {Offense: {...aOffense}, Defense: {...aDefense}} 

        // Add game ratios
        const hOffenseYards = 
            hOffense.passingYards + hOffense.rushingYards
        const aOffenseYards = 
            aOffense.passingYards + hOffense.rushingYards
        
        const hDefenseYards = 
            hDefense.passingYards + hDefense.rushingYards
        const aDefenseYards = 
            aDefense.passingYards + aDefense.rushingYards

        // game.HomeOffensiveYards = hOffenseYards
        // game.AwayOffensiveYards = aOffenseYards
        // game.HomeDefensiveYards = hDefenseYards
        // game.AwayDefensiveYards = aDefenseYards
        game.ratios = {
            homeOffense: hOffenseYards/aDefenseYards,
            homePassingOffense:  hOffense.passingYards/aDefense.passingYards,
            homeRushingYards: hOffense.rushingYards/aDefense.rushingYards,
            homeDefensive: aOffenseYards/hDefenseYards,
            homePassingDefense: aOffense.passingYards/hDefense.passingYards,
            homeRushingDefense: aOffense.rushingYards/hDefense.rushingYards,
            awayOffense: aOffenseYards/hDefenseYards,
            awayPassingOffense:  aOffense.passingYards/hDefense.passingYards,
            awayRushingYards: aOffense.rushingYards/hDefense.rushingYards,
            awayDefensive: hOffenseYards/aDefenseYards,
            awayPassingDefense: hOffense.passingYards/aDefense.passingYards,
            awayRushingDefense: hOffense.rushingYards/aDefense.rushingYards,
        }

        // Add the player information to the game
        game.home.players = []
        game.away.players = []

        // filter to create an array containing only the players that play for the teams
        // that are participating in the game
        const gamePlayers = players.filter(player => (
            player.teamNickname === game.home || player.teamNickname === game.away
        ))

        gamePlayers.map(player => {
            if(player.teamNickname === game.home) {
                player = calculatePlayerRatios(player, game.home.offense, game.away.defense)
                game.home.players.push(player)
            } else {
                player = calculatePlayerRatios(player, game.away.offense, game.home.defense)
                game.away.players.push(player)
            }
        })

        games.push(game)
    })
    return games
}

const getPlayers =  () => getCSVData(playersFilename, (err) => console.log(err)).then((data) => parsePlayerData(data));
const getOffense = () => getCSVData(teamOffenseFilename, (err) => console.log(err)).then(data => parseOffensiveData(data));
const getDeffense = () => getCSVData(teamDefenseFilename, (err) => console.log(err)).then(data => parseDefensiveData(data));
const getSchedule = () => getCSVData(scheduleFilename, (err) => console.log(err)).then(data => parseSchedule(data));

export const getData = async () => {
    console.log('Parsing Data')
    const players = await getPlayers().then(data => data)
    const offense = await getOffense().then(data => data)
    const defense = await getDeffense().then(data => data)
    const schedule = await getSchedule().then(data => data)

    console.log('Parsing Game Data')
    const games = parseGameData(schedule, offense, defense, Object.values(players))

    console.log('Data Parsing Complete')
    return {players: Object.values(players), teams: createTeams(Object.values(offense), Object.values(defense)), games}
}
