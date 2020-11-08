import {
    Offense,
    Defense,
    Team,
    Game,
    GameRatios,
    PlayerRatios
} from 'shared-lib/src/index'


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

export const parseGameData = (scheduledGames, offenses, defenses, players) => {
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

export default parseGameData