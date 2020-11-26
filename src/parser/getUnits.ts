import { Offense, Defense, Player } from '../types'

const getOffensiveUnits = (offenses:Array<Offense>) => {
    let totalMin = null, passingMin = null, rushingMin = null
    let totalMax = null, passingMax = null, rushingMax = null

    offenses.map( offense => {
        // determine the mins and maxes to calculate the offensive units later
        totalMin = (totalMin === null || totalMin > offense.totalYards)? offense.totalYards : totalMin
        totalMax = (totalMax === null || totalMax < offense.totalYards)? offense.totalYards : totalMax
        passingMin = (passingMin === null || passingMin > offense.passingYards)? offense.passingYards : passingMin
        passingMax = (passingMax === null || passingMax < offense.passingYards)? offense.passingYards : passingMax
        rushingMin = (rushingMin === null || rushingMin > offense.rushingYards)? offense.rushingYards : rushingMin
        rushingMax = (rushingMax === null || rushingMax < offense.rushingYards)? offense.rushingYards : rushingMax
    })

    const numberOfTeams = offenses.length
    const offensiveUnit = (totalMax - totalMin)/numberOfTeams
    const passingUnit = (passingMax - passingMin)/numberOfTeams
    const rushingUnit = (rushingMax - rushingMin)/numberOfTeams

    return {totalMin, totalMax, passingMin, passingMax, rushingMin, rushingMax, offensiveUnit, passingUnit, rushingUnit}
}

const getDefensiveUnits = (defenses:Array<Defense>) => {
    let totalMin = null, passingMin = null, rushingMin = null
    let totalMax = null, passingMax = null, rushingMax = null

    defenses.map( defense => {
        // determine the mins and maxes to calculate the offensive units later
        totalMin = (totalMin === null || totalMin > defense.totalYards)? defense.totalYards : totalMin
        totalMax = (totalMax === null || totalMax < defense.totalYards)? defense.totalYards : totalMax
        passingMin = (passingMin === null || passingMin > defense.passingYards)? defense.passingYards : passingMin
        passingMax = (passingMax === null || passingMax < defense.passingYards)? defense.passingYards : passingMax
        rushingMin = (rushingMin === null || rushingMin > defense.rushingYards)? defense.rushingYards : rushingMin
        rushingMax = (rushingMax === null || rushingMax < defense.rushingYards)? defense.rushingYards : rushingMax
    })

    const numberOfTeams = defenses.length
    const defensiveUnit = (totalMax - totalMin)/numberOfTeams
    const passingUnit = (passingMax - passingMin)/numberOfTeams
    const rushingUnit = (rushingMax - rushingMin)/numberOfTeams

    return {totalMin, totalMax, passingMin, passingMax, rushingMin, rushingMax, defensiveUnit, passingUnit, rushingUnit}
}

const getPlayerUnits = (players:Array<Player>) => {
    let passingMin = null, rushingMin = null, receivingMin = null
    let passingMax = null, rushingMax = null, receivingMax = null

    players.map(player => {
        passingMin = (passingMin === null || passingMin > player.passingYards)? player.passingYards : passingMin
        passingMax = (passingMax === null || passingMax < player.passingYards)? player.passingYards : passingMax
        rushingMin = (rushingMin === null || rushingMin > player.rushingYards)? player.rushingYards : rushingMin
        rushingMax = (rushingMax === null || rushingMax < player.rushingYards)? player.rushingYards : rushingMax
        receivingMin = (receivingMin === null || receivingMin > player.receivingYards)? player.receivingYards : receivingMin
        receivingMax = (receivingMax === null || receivingMax < player.receivingYards)? player.receivingYards : receivingMax
    })

    const numberOfPlayers = players.length
    const passingUnit = (passingMax - passingMin)/numberOfPlayers
    const rushingUnit = (rushingMax - rushingMin)/numberOfPlayers
    const receivingUnit = (receivingMax - receivingMin)/numberOfPlayers
    return {passingMin, passingMax, rushingMin, rushingMax, receivingMin, receivingMax, passingUnit, rushingUnit, receivingUnit}
}

export const getUnits = (offenses:Array<Offense>, defenses:Array<Defense>, players: Array<Player>) => {
    const offensiveUnits = getOffensiveUnits(offenses)
    const defensiveUnits = getDefensiveUnits(defenses)
    const playerUnits = getPlayerUnits(players)
    return {offensiveUnits, defensiveUnits, playerUnits}
}

export default getUnits