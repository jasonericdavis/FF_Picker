import { Offense, Defense, Player } from './types'

type stat = number | null

const teamTotals = ['Avg Team','League Total','Avg Tm/G']
const getOffensiveUnits = (offenses:Array<Offense>) => {
    let totalMin:stat = null, passingMin:stat = null, rushingMin:stat = null
    let totalMax:stat = null, passingMax: stat = null, rushingMax:stat = null

    offenses.filter(team => teamTotals.indexOf(team.team) < 0).map( offense => {
        // determine the mins and maxes to calculate the offensive units later
        totalMin = (totalMin === null || totalMin > offense.totalYards)? offense.totalYards : totalMin
        totalMax = (totalMax === null || totalMax < offense.totalYards)? offense.totalYards : totalMax
        passingMin = (passingMin === null || passingMin > offense.passingYards)? offense.passingYards : passingMin
        passingMax = (passingMax === null || passingMax < offense.passingYards)? offense.passingYards : passingMax
        rushingMin = (rushingMin === null || rushingMin > offense.rushingYards)? offense.rushingYards : rushingMin
        rushingMax = (rushingMax === null || rushingMax < offense.rushingYards)? offense.rushingYards : rushingMax
    })

    const numberOfTeams = offenses.length
    const offensiveUnit =  (totalMax != null && totalMin !=null) ? (totalMax - totalMin)/numberOfTeams : -1
    const passingUnit = (passingMax != null && passingMin !=null) ? (passingMax - passingMin)/numberOfTeams : -1
    const rushingUnit = (rushingMax !=null && rushingMin != null) ? (rushingMax - rushingMin)/numberOfTeams : -1

    return {totalMin, totalMax, passingMin, passingMax, rushingMin, rushingMax, offensiveUnit, passingUnit, rushingUnit}
}

const getDefensiveUnits = (defenses:Array<Defense>) => {
    let totalMin:stat = null, passingMin:stat = null, rushingMin:stat = null
    let totalMax:stat = null, passingMax:stat = null, rushingMax:stat = null

    // skip the Avg Team, League Total  and Avg Tm/G records
    defenses.filter(team => teamTotals.indexOf(team.team) < 0).map( defense => {
        if (defense.team === 'Avg Team' || defense.team === 'League Total' || defense.team === 'Avg Tm/G') {
            return
        }
        // determine the mins and maxes to calculate the offensive units later
        totalMin = (totalMin === null || totalMin > defense.totalYards)? defense.totalYards : totalMin
        totalMax = (totalMax === null || totalMax < defense.totalYards)? defense.totalYards : totalMax
        passingMin = (passingMin === null || passingMin > defense.passingYards)? defense.passingYards : passingMin
        passingMax = (passingMax === null || passingMax < defense.passingYards)? defense.passingYards : passingMax
        rushingMin = (rushingMin === null || rushingMin > defense.rushingYards)? defense.rushingYards : rushingMin
        rushingMax = (rushingMax === null || rushingMax < defense.rushingYards)? defense.rushingYards : rushingMax
    })

    const numberOfTeams = defenses.length
    const defensiveUnit = (totalMax != null && totalMin != null) ? (totalMax - totalMin)/numberOfTeams : -1
    const passingUnit = (passingMax != null && passingMin != null) ? (passingMax - passingMin)/numberOfTeams : -1
    const rushingUnit = (rushingMax != null && rushingMin != null) ? (rushingMax - rushingMin)/numberOfTeams : -1

    return {totalMin, totalMax, passingMin, passingMax, rushingMin, rushingMax, defensiveUnit, passingUnit, rushingUnit}
}

const getPlayerUnits = (players:Array<Player>) => {
    let passingMin:stat = null, rushingMin:stat = null, receivingMin:stat = null
    let passingMax:stat = null, rushingMax:stat = null, receivingMax:stat = null

    players.map(player => {
        passingMin = (passingMin === null || passingMin > player.passingYards)? player.passingYards : passingMin
        passingMax = (passingMax === null || passingMax < player.passingYards)? player.passingYards : passingMax
        rushingMin = (rushingMin === null || rushingMin > player.rushingYards)? player.rushingYards : rushingMin
        rushingMax = (rushingMax === null || rushingMax < player.rushingYards)? player.rushingYards : rushingMax
        receivingMin = (receivingMin === null || receivingMin > player.receivingYards)? player.receivingYards : receivingMin
        receivingMax = (receivingMax === null || receivingMax < player.receivingYards)? player.receivingYards : receivingMax
    })

    const numberOfPlayers = players.length
    const passingUnit = (passingMax != null && passingMin != null) ? (passingMax - passingMin)/numberOfPlayers : -1
    const rushingUnit = (rushingMax != null && rushingMin != null) ? (rushingMax - rushingMin)/numberOfPlayers : -1
    const receivingUnit = (receivingMax != null && receivingMin != null) ? (receivingMax - receivingMin)/numberOfPlayers : -1
    return {passingMin, passingMax, rushingMin, rushingMax, receivingMin, receivingMax, passingUnit, rushingUnit, receivingUnit}
}

export const getUnits = (offenses:Array<Offense>, defenses:Array<Defense>, players: Array<Player>) => {
    const offensiveUnits = getOffensiveUnits(offenses)
    const defensiveUnits = getDefensiveUnits(defenses)
    const playerUnits = getPlayerUnits(players)
    return {offensiveUnits, defensiveUnits, playerUnits}
}

export default getUnits