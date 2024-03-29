import {
    Game,
    Offense,
    Player,
    PlayerRatios,
    ScheduledGame,
    Team,
    TeamSimulation
} from './types'

interface OffensiveYards {
    passingYardsDiff: number,
    rushingYardsDiff: number,
}

const simulatePlayerYards = (player:Player, offense:Offense, {passingYardsDiff, rushingYardsDiff}:OffensiveYards) => {
    const perPassingYards =  player.passingYards/offense.passingYards
    const perRushingYards =  player.rushingYards/offense.rushingYards
    const perReceivingYards = player.receivingYards/offense.passingYards

    const playerPassingDiff = perPassingYards * passingYardsDiff
    const playerRushingDiff = perRushingYards * rushingYardsDiff
    const playerReceivingDiff = perReceivingYards * passingYardsDiff

    return {
        name: player.name,
        passingYards: Math.round(player.passingYards + playerPassingDiff),
        passingYardsDiff: Math.round(playerPassingDiff),
        passingPercentage: Math.round(perPassingYards),
        rushingYards: Math.round(player.rushingYards + playerRushingDiff),
        rushingYardsDiff: Math.round(playerRushingDiff),
        rushingPercentage: Math.round(perRushingYards),
        receivingYards: Math.round(player.receivingYards + playerReceivingDiff),
        receivingYardsDiff: Math.round(playerReceivingDiff),
        receivingPercentage: Math.round(perReceivingYards)
    }

}

const simulateGameYards = ({name, offense}:Team, {defense}:Team, players: Array<Player>, units: any):TeamSimulation => {
    //const offense = teams[team].offense; // offenses[homeTeam]
    //const defense = teams[opponent].defense; //defense[awayTeam]

    const totalYards = Math.round(offense.totalYards + (offense.offensiveRank * units.offensiveUnits.offensiveUnit) - (defense.defensiveRank * units.defensiveUnits.defensiveUnit))
    const totalYardsDiff = Math.round((offense.offensiveRank * units.offensiveUnits.offensiveUnit) - (defense.defensiveRank * units.defensiveUnits.defensiveUnit))
    const passingYards =  Math.round(offense.passingYards + (offense.passingRank * units.offensiveUnits.passingUnit) - (defense.passingRank * units.defensiveUnits.passingUnit))
    const passingYardsDiff = Math.round((offense.passingRank * units.offensiveUnits.passingUnit) - (defense.passingRank * units.defensiveUnits.passingUnit))
    const rushingYards = Math.round(offense.rushingYards + (offense.rushingRank * units.offensiveUnits.rushingUnit) - (defense.rushingRank * units.defensiveUnits.rushingUnit))
    const rushingYardsDiff = Math.round((offense.rushingRank * units.offensiveUnits.rushingUnit) - (defense.rushingRank * units.defensiveUnits.rushingUnit))

    return {
            name,
            totalYards,
            totalYardsDiff,
            passingYards,
            passingYardsDiff,
            rushingYards,
            rushingYardsDiff,
            players: players.reduce((a:any, player:Player) => {
                a.push(simulatePlayerYards(player, offense, {passingYardsDiff, rushingYardsDiff}))
                return a
            }, [])
    }
}

export const parseGameData = (scheduledGames:Array<ScheduledGame>, teams:{[key: string]:Team}, players:{[key:string]: Player}, units: any) => {
    let games:Array<Game> = []
    const playerList = Object.values(players)
    scheduledGames.map((scheduledGame) => {
        let home = simulateGameYards(
            teams[scheduledGame.home_team], 
            teams[scheduledGame.away_team], 
            playerList.filter(player => player.team == scheduledGame.home_team), 
            units)
        let away = simulateGameYards(
            teams[scheduledGame.away_team], 
            teams[scheduledGame.home_team],
            playerList.filter(player => player.team == scheduledGame.away_team), 
            units)

        // const hOffense = offenses[scheduledGame.home]
        // const aOffense = offenses[scheduledGame.away]
        // const hDefense = defenses[scheduledGame.home]
        // const aDefense = defenses[scheduledGame.away]
        // home = {name: scheduledGame.home, offense: {...hOffense}, defense: {...hDefense}, players: []}
        // away = {name: scheduledGame.away, offense: {...aOffense}, defense: {...aDefense}, players: []} 
        //home = {...home, name: scheduledGame.home, players: []}
        //away = {...home, name: scheduledGame.away, players: []} 

        // filter to create an array containing only the players that play for the teams
        // that are participating in the game
        // const gamePlayers = playerList.filter(player => (
        //     player.team === home.name || player.team === away.name
        // ))

        // gamePlayers.map(player => {
        //     if(player.team === home.name) {
        //         player = simulatePlayerYards(player, teams[home.name])
        //         home.players.push(player)
        //     } else {
        //         player = simulatePlayerYards(player, teams[away.name])
        //         away.players.push(player)
        //     }
        // })

 
        games.push({
            week: scheduledGame.week,
            date: scheduledGame.date, 
            // kickoff: scheduledGame.kickoff,
            home_team: home,
            away_team: away
        })
    })
    return games
}

export default parseGameData