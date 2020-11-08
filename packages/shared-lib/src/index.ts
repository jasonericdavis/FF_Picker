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
    team: string,
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

export interface ScheduledGame {
    home: string,
    away: string,
    date: string,
    kickoff: string
}

export interface Game {
    home: Team,
    away: Team,
    date: string,
    kickoff: string,
    ratios: GameRatios
}