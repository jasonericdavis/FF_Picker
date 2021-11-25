export interface Player {
    fantasyPoints: number,
    id: string,
    name: string,
    games: number,
    passingAttempts: number,
    passingCompletions: number,
    passingInterceptions: number,
    passingTouchdowns: number,
    passingYards: number,
    passingYardsPerGame: number,
    position: string,
    receivingAverage: number,
    receivingTargets: number,
    receivingTouchdowns: number,
    receivingYards: number,
    receivingReceptions: number,
    receivingYardsPerGame: number,
    rushingAttempts: number,
    rushingAverage: number,
    rushingTouchdowns: number,
    rushingYards: number,
    rushingYardsPerGame: number,
    team: string,
    teamId:string | null,
    teamAbbr: string,
    ratios?: PlayerRatios
}

export type Players = Array<{
    playerId: string,
    teamId: string | null,
    week: number,
    stats: Player
}>

export interface PlayerRatios {
    defense: number,
    offensive: number,
    passing: number,
    rushing: number,
    receiving: number
}

export interface Defense {
    gamesPlayed: number,
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
    averageTotalYards: number,
    averagePassingYards: number,
    averageRushingYards: number,
    defensiveRank: number,
    passingRank: number,
    rushingRank: number
}

export interface Offense {
    gamesPlayed: number,
    interceptions: number,
    passingAttempts: number,
    passingCompletions: number,
    passingTouchdowns: number,
    passingYards: number,
    rushingAttempts: number,
    rushingTouchdowns: number,
    rushingYards: number,
    totalYards: number,
    averageTotalYards:number,
    averageRushingYards: number,
    averagePassingYards: number,
    team: string,
    offensiveRank: number,
    passingRank: number,
    rushingRank: number
}

export interface Team {
    name: string,
    week: number,
    teamId: string | null,
    offense: Offense,
    defense: Defense,
    players?: Players
}

export interface GameRatios {
    awayDefensive: number,
    awayOffense: number,
    awayPassingDefense: number,
    awayPassingOffense: number,
    awayRushingDefense: number,
    awayRushingOffense: number,
    homeDefensive: number,
    homeOffense: number,
    homePassingDefense: number,
    homePassingOffense: number,
    homeRushingDefense: number,
    homeRushingOffense: number
}

export interface Simulation {
    totalYards: number,
    passingYards: number,
    rushingYards: number
}

export interface TeamSimulation {
    name: string,
    totalYards: number,
    totalYardsDiff: number,
    passingYards: number,
    passingYardsDiff: number,
    rushingYards: number,
    rushingYardsDiff: number,
    players: Array<Player>
}

export interface PlayerSimulation {
    name: string,
    passingYards: number,
    passingYardsDiff: number,
    passingPercentage: number,
    rushingYards: number,
    rushingYardsDiff: number,
    rushingPercentage: number,
    receivingYards: number,
    receivingYardsDiff: number,
    receivingPercentage: number
}

export interface ScheduledGame {
    week: number,
    home_team: string,
    away_team: string,
    date: string,
    //kickoff: string
}

export interface Game {
    week: number,
    home_team: TeamSimulation,
    away_team: TeamSimulation,
    date: string
}


export interface nicknames { [key: string]: string}