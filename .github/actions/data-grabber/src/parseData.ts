import core = require('@actions/core');
import {Offense, Defense, Player,Team} from './types'
import nicknames from './nicknames'
import {teams as teamsCache} from './teams';

/**
 * This function takes a array of statHeaders and returns them as an object with the 
 * position of the stat in the staHeaders array
 * @param statHeaders array of stat headers that are to be used
 * @returns An object with the key of the stat header and its position in the header array
 */
  function createStatPointer(statHeaders: Array<string>) {
    let statPtr: {[key:string]: number} = {}
    statHeaders.map((col, colIndex) => {
        let tempColName = col
        let colNameCounter = 0

        /**  
         * Because the name of a column can appear multiple times in the list of columns
         * this logic will append a suffix to the column if it is already in the list of columns
         * */ 
        while(statPtr[`${tempColName}`]) {
            colNameCounter += 1
            tempColName = `${tempColName.replace(`_${colNameCounter - 1}`, '')}_${colNameCounter}`             
        } 
        statPtr[tempColName ] = colIndex
    })
    return statPtr
}

function createOffenseFromStats(stats: string[], statPtr: {[key:string]:number}): Offense {
    core.info(`Creating Offense for ${stats[statPtr['Tm']]}`)
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
        offensiveRank: Number(stats[statPtr['Rk']]),
        passingRank: Number(stats[statPtr['Rk']]),
        rushingRank: Number(stats[statPtr['Rk']])
    }
}

function parseOffensiveData(data:string):{[key:string]: Offense} {
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
    return offenses
}

function createDefenseFromStats(stats: string[], statPtr: {[key:string]:number}): Defense{
    core.info(`Creating Defense for ${stats[statPtr['Tm']]}`)
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
        defensiveRank: Number(stats[statPtr['Rk']]),
        passingRank: Number(stats[statPtr['Rk']]),
        rushingRank: Number(stats[statPtr['Rk']])
    }
}

function parseDefensiveData(data:string):{[key:string]: Defense}{
    let lines = data.split('\n')
    let statPtr:{[key:string]: number} = {};
    let defenses:{[key:string]: Defense} = {};

    lines.map((line, index) => {
        // the first line contains the keys
        const stats = line.split(',')
        if(line.startsWith('Rk')) {
            statPtr = createStatPointer(stats)
            return
        } 
        if(Object.keys(statPtr).length > 0) { 
            defenses[stats[statPtr['Tm']]] = createDefenseFromStats(stats, statPtr)
        }
    })
    return defenses
}

export const calculateTeamRanks = (
    stats:{[key:string]:{name: string,passingRank: number, rushingRank: number, passingYards: number, rushingYards: number}},
    inverse: boolean = false
) => {
    const leagueValues = ['Avg Team', 'Avg Tm/G', 'League Total']
    Object.values(stats).map( stat => {
        const passingFiler = Object.values(stats).filter(
            x => leagueValues.includes(stat.name) || x.passingYards > stat.passingYards)
        
        stat.passingRank = inverse ? 
             Object.values(stats).length - leagueValues.length - passingFiler.length  + 1
            : passingFiler.length - leagueValues.length + 1
        
        const rushingFilter  = Object.values(stats).filter(
            x => leagueValues.includes(stat.name) || x.rushingYards > stat.rushingYards)

        stat.rushingRank = inverse ?
            Object.values(stats).length - leagueValues.length - rushingFilter.length  + 1
            : rushingFilter.length - leagueValues.length + 1
    })
    return stats
}

export const calculateTeamRank = (
    stats:{[key:string]:string | any},
    statKey: string,
    ignoreList : string[] = [],
    inverse: boolean = false
) => {
    //const leagueValues = ['Avg Team', 'Avg Tm/G', 'League Total']
    Object.values(stats).map( stat => {
        const betterTeams = Object.values(stats).filter(
            x => ignoreList.includes(stat.name) || x[statKey] > stat[statKey])
        
        stat[statKey] = inverse ? 
             Object.values(stats).length - ignoreList.length - betterTeams.length  + 1
            : betterTeams.length - ignoreList.length + 1
    })
    return stats
}

function createPlayerFromStats(
    stats: string[], 
    statPtr: {[key:string]:number},
    teams: Array<{name: string, id: string}>)
: Player{  
    const playerTeam = teams.find(t => t.name === nicknames[stats[statPtr['Tm']]]) || {id: null}    
    return {
        name: stats[statPtr['Player']].split('\\')[0],
        id: stats[statPtr['Player']].split('\\')[1],
        games: Number(stats[statPtr['G']]),
        position: stats[statPtr['FantPos']],
        fantasyPoints: Number(stats[statPtr['FantPt']]),
        team: nicknames[stats[statPtr['Tm']]],
        teamId: playerTeam.id,
        teamAbbr: stats[statPtr['Tm']],
        passingAttempts: Number(stats[statPtr['Att']]),
        passingCompletions: Number(stats[statPtr['Cmp']]),
        passingYards:Number(stats[statPtr['Yds']]),
        passingYardsPerGame: Number(stats[statPtr['Yds']])/ Number(stats[statPtr['G']]),
        passingTouchdowns: Number(stats[statPtr['TD']]),
        passingInterceptions: Number(stats[statPtr['Int']]),
        rushingAttempts: Number(stats[statPtr['Att_1']]),
        rushingYards: Number(stats[statPtr['Yds_1']]),
        rushingYardsPerGame: Number(stats[statPtr['Yds_1']])/ Number(stats[statPtr['G']]),
        rushingAverage: Number(stats[statPtr['Y/A']]),
        rushingTouchdowns: Number(stats[statPtr['TD_1']]),
        receivingTargets:Number(stats[statPtr['Tgt']]),
        receivingReceptions: Number(stats[statPtr['Rec']]),
        receivingYards: Number(stats[statPtr['Yds_2']]),
        receivingYardsPerGame: Number(stats[statPtr['Yds_2']])/ Number(stats[statPtr['G']]),
        receivingAverage: Number(stats[statPtr['Y/R']]),
        receivingTouchdowns: Number(stats[statPtr['TD_2']])
    }
}

function parsePlayerData(
    data: string,
    teams: Array<{name: string, id: string}>,
    week: number ): {[key: string]: Player} {
        let lines = data.split('\n')
        let statPtr:any = {};
        let players: any = {};

        lines.map((line, index) => {
            const stats = line.split(',')
            if(line.startsWith('Rk')) {
                statPtr = createStatPointer(stats)
                return
            } 

            // If the columns have been populated then we can begin to parse the data
            if(Object.keys(statPtr).length > 0) { 
                //use the columns to create an object for each player and push into array
                let player = createPlayerFromStats(stats, statPtr, teams)
                players[player.name] = {playerId:player.id, teamId:player.teamId, week, stats: player}
            }
        })
        return players
}

/**
 * This method combines the offenses and defenses into an array
 * of objects that contain both the offense and defense for a particular team
 * @param {Dictionary[Offense]} offense a dictionary of the offenses
 * @param {Dictionary[Deffense]} defense a dictionary of the defenses
 * @returns {Dictionary[Team]} A dictionary with the respective teams
 */
function createTeams(week: number, offenses:{[key:string]: Offense}, defenses:{[key:string]: Defense}):{[key:string]:Team}{
    const offensesArray:Array<Offense> = Object.values(offenses)
    const teams:{[key:string]:Team} = {}

    offensesArray.map((offense) => {
        core.info(`Creating team for ${offense.team}`)
        const currentTeam = teamsCache.filter(team => team.name === offense.team)
        const teamId = currentTeam.length > 0 ? currentTeam[0].id : null;
        teams[offense.team] = {name: offense.team, teamId, week, offense, defense: defenses[offense.team]}
    })
    return teams
}

export default function parseData(offensiveStats: string, defensiveStats: string, playerStats: string, week: number){
    core.startGroup('Parsing Offensive Data')
    const offenses = parseOffensiveData(offensiveStats);
    core.info(`${Object.keys(offenses).length} offenses created`)
    core.endGroup()

    core.startGroup('Parsing Defensive Data')
    const defenses = parseDefensiveData(defensiveStats);
    core.info(`${Object.keys(defenses).length} defenses created`)
    core.endGroup()

    core.startGroup('Creating Teams')
    const teams = createTeams(week, offenses, defenses);
    core.info(`${Object.keys(teams).length} teams created`)
    core.endGroup()

    core.startGroup('Parsing Player Data')
    const players = parsePlayerData(playerStats, teamsCache, week);
    core.info(`${Object.keys(players).length} players created`)
    core.endGroup()

    return {teams, players}
};