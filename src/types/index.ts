export interface Player {
    fantasyPoints: number,
    id: string,
    name: string,
    passingAttempts: number,
    passingCompletions: number,
    passingInterceptions: number,
    passingTouchdowns: number,
    passingYards: number,
    position: string,
    receivingAverage: number,
    receivingTargets: number,
    receivingTouchdowns: number,
    receivingYards: number,
    receivingReceptions: number,
    rushingAttempts: number,
    rushingAverage: number,
    rushingTouchdowns: number,
    rushingYards: number,
    team: string,
    teamAbbr: string,
    ratios?: PlayerRatios
}

export interface PlayerRatios {
    defense: number,
    offensive: number,
    passing: number,
    rushing: number,
    receiving: number
}

export interface Defense {
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
    defensiveRank: number,
    passingRank: number,
    rushingRank: number
}

export interface Offense {
    interceptions: number,
    passingAttempts: number,
    passingCompletions: number,
    passingTouchdowns: number,
    passingYards: number,
    rushingAttempts: number,
    rushingTouchdowns: number,
    rushingYards: number,
    totalYards: number,
    team: string,
    offensiveRank: number,
    passingRank: number,
    rushingRank: number
}

export interface Team {
    name: string,
    offense: Offense,
    defense: Defense,
    players?: Array<Player>
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
    home: string,
    away: string,
    date: string,
    kickoff: string
}

export interface Game {
    home: TeamSimulation,
    away: TeamSimulation,
    date: string,
    kickoff: string
}