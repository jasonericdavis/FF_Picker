///<referrence path='lib/index.d.ts' />
const fs = require('fs').promises;
// const path = require('path')
// const nicknames = require('./nicknames.json')
//import {promises as fs} from 'fs'
import path from 'path'
import nicknames from './nicknames.json'
import {
    Player,
    Offense,
    Defense,
    Team,
    Game,
    ScheduledGame,
    PlayerRatios
} from 'shared-lib'

const playersFilename = 'pfW7Players.csv'
const teamOffenseFilename = 'pfW7TeamOffense.csv'
const teamDefenseFilename = 'pfW7TeamDefense.csv'
const scheduleFilename = 'pfSchedule.csv'

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
                team: nicknames[cols[columns['Tm']]],
                teamAbbr: cols[columns['Tm']],
                completions: Number(cols[columns['Cmp']]),
                passingAttempts: Number(cols[columns['Att']]),
                passingYards:Number(cols[columns['Yds']]),
                passingTouchdowns: Number(cols[columns['Td']]),
                int: Number(cols[columns['Int']]),
                attempts: Number(cols[columns['Att_1']]),
                rushingYards: Number(cols[columns['Yds_1']]),
                rushingAverage: Number(cols[columns['Y/A']]),
                rushingTouchdowns: Number(cols[columns['TD_1']]),
                targets:Number(cols[columns['Tgt']]),
                receptions: Number(cols[columns['Rec']]),
                receivingYards: Number(cols[columns['Yds_2']]),
                receivingAverage: Number(cols[columns['Y/R']]),
                receivingTouchdowns: Number(cols[columns['TD_2']])
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
                rushingTouchdowns: Number(cols[columns['TD_1']]),
                passingRank: lines.length,
                rushingRank: lines.length
            }
            offenses[ newOffense.team] = newOffense
        }
    })

    Object.values(offenses).map( offense => {
        offense.passingRank = Object.values(offenses).filter(
            x => x.passingYards > offense.passingYards).length + 1
        offense.rushingRank = Object.values(offenses).filter(
            x => x.rushingYards > offense.rushingYards).length + 1
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

/**
 * This method parses the schedule from the csv data 
 * and returns a subset of the schedule for a particular week
 * @param {string} data The csv data of the schedule
 * @param {string} week The week number of games to retreive
 * @return {ScheduledGame[]} An array of ScheduledGame objects
 */
const getScheduledGames = (data, week):Array<ScheduledGame> => {
    const lines = data.split('\n')
    const scheduledGames: Array<ScheduledGame> = [];
    lines.map((line) => {
        const cols = line.split(',')
        
        // If its not the week we are looking for skip
        if(cols[0] != week) return
        
        scheduledGames.push({
            home: cols[6],
            away: cols[4],
            date: cols[2],
            kickoff: cols[3]
        })   
    })
    return scheduledGames
}

const getCSVData =  async (filename, callback) => { 
    const filepath = path.join(process.cwd(), 'data', filename)
    console.log(`Reading CSV file: ${filepath}`)
    return await fs.readFile(filepath, 'utf8', callback)
}

const calculatePlayerRatios = (player, offense, defense) => {
    const playerStat = player.passingYards + player.rushingYards + player.receivingYards
    const teamOffense = offense.passingYards + offense.rushingYards
    const teamDefense = defense.passingYards + defense.rushingYards
    const ratio:PlayerRatios ={
        passing: player.passingYards/defense.passingYards,
        rushing: player.rushingYards/defense.rushingYards,
        receiving: player.receivingYards/defense.passingYards,
        offensive: playerStat/teamOffense,
        defense: playerStat/teamDefense
    }
    return {...player, ratio}
}

const calculateGameRatios = (homeTeam:string, awayTeam:string, offense:Array<Offense>, defense:Array<Defense>):GameRatios => {
    const hOffense = offense[homeTeam]
    const aOffense = offense[awayTeam]

    const hDefense = defense[homeTeam]
    const aDefense = defense[awayTeam]

    // Add game ratios
    const hOffenseYards = 
        hOffense.passingYards + hOffense.rushingYards
    const aOffenseYards = 
        aOffense.passingYards + hOffense.rushingYards
    
    const hDefenseYards = 
        hDefense.passingYards + hDefense.rushingYards
    const aDefenseYards = 
        aDefense.passingYards + aDefense.rushingYards

    return {
        homeOffense: (0.5 * hOffenseYards) + (0.5 * aDefenseYards),
        homePassingOffense:  (0.75 * hOffense.passingYards) + (0.25 * aDefense.passingYards),
        homeRushingOffense: hOffense.rushingYards/aDefense.rushingYards,
        homeDefensive: aOffenseYards/hDefenseYards,
        homePassingDefense: aOffense.passingYards/hDefense.passingYards,
        homeRushingDefense: aOffense.rushingYards/hDefense.rushingYards,
        awayOffense: aOffenseYards/hDefenseYards,
        awayPassingOffense:  aOffense.passingYards/hDefense.passingYards,
        awayRushingOffense: aOffense.rushingYards/hDefense.rushingYards,
        awayDefensive: hOffenseYards/aDefenseYards,
        awayPassingDefense: hOffense.passingYards/aDefense.passingYards,
        awayRushingDefense: hOffense.rushingYards/aDefense.rushingYards,
    }
}

const parseGameData = (scheduledGames, offenses, defenses, players) => {
    let games:Array<Game> = []
    scheduledGames.map((scheduledGame) => {
        const ratios = calculateGameRatios(scheduledGame.home, scheduledGame.away, offenses, defenses)

        const hOffense = offenses[scheduledGame.home]
        const aOffense = offenses[scheduledGame.away]
        const hDefense = defenses[scheduledGame.home]
        const aDefense = defenses[scheduledGame.away]
        let home:Team = {name: scheduledGame.home, offense: {...hOffense}, defense: {...hDefense}, players: []}
        let away:Team = {name: scheduledGame.away, offense: {...aOffense}, defense: {...aDefense}, players: []} 

        // filter to create an array containing only the players that play for the teams
        // that are participating in the game
        const gamePlayers = players.filter(player => (
            player.team === home.name || player.team === away.name
        ))

        gamePlayers.map(player => {
            if(player.team === home.name) {
                player = calculatePlayerRatios(player, home.offense, away.defense)
                home.players.push(player)
            } else {
                player = calculatePlayerRatios(player, away.offense, home.defense)
                away.players.push(player)
            }
        })

 
        games.push({
            date: scheduledGame.date, 
            kickoff: scheduledGame.kickoff,
            home,
            away,
            ratios
        })
    })
    return games
}

const getPlayers =  () => getCSVData(playersFilename, (err) => console.log(err)).then((data) => parsePlayerData(data));
const getOffense = () => getCSVData(teamOffenseFilename, (err) => console.log(err)).then(data => parseOffensiveData(data));
const getDeffense = () => getCSVData(teamDefenseFilename, (err) => console.log(err)).then(data => parseDefensiveData(data));
const getSchedule = () => getCSVData(scheduleFilename, (err) => console.log(err)).then(data => getScheduledGames(data, '8'));

export const getData = async () => {
    console.log('Parsing Data')
    const players = await getPlayers().then(data => data)
    const offense = await getOffense().then(data => data)
    const defense = await getDeffense().then(data => data)
    const scheduledGames = await getSchedule().then(data => data)

    console.log('Parsing Game Data')
    const games = parseGameData(scheduledGames, offense, defense, Object.values(players))

    console.log('Data Parsing Complete')
    return {players: Object.values(players), teams: createTeams(Object.values(offense), Object.values(defense)), games}
}
