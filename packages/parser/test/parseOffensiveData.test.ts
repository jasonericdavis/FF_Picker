import {parseOffensiveData, calculateTeamRanks} from '../src/parseOffensiveData'
import {Offense} from 'shared-lib/dist/index'

test('test-parse-offensive-data', () => {
    const data = 
    `Rk,Tm,G,PF,Yds,Ply,Y/P,TO,FL,1stD,Cmp,Att,Yds,TD,Int,NY/A,1stD,Att,Yds,TD,Y/A,1stD,Pen,Yds,1stPy,Sc%,TO%,EXP
    1,Test Team,8,31.6,410.5,65.3,6.3,0.63,0.50,23.6,24.5,36.4,286.4,2.63,0.13,7.6,15.0,27.5,124.1,0.88,4.5,6.88,6.00,51.1,1.75,51.3,6.3,15.4`

    const offenses = parseOffensiveData(data)
    const offense = offenses['Test Team']
    expect(offense).not.toBeNull()
    expect(offense.passingCompletions).toBe(24.5)
    expect(offense.passingYards).toBe(286.4)
    expect(offense.passingTouchdowns).toBe(2.63)
    expect(offense.interceptions).toBe(0.13)

    expect(offense.rushingAttempts).toBe(27.5)
    expect(offense.rushingYards).toBe(124.1)
    expect(offense.rushingTouchdowns).toBe(0.88)
})

test('test-calulate-team-ranking', () => {
    const offenses:{[key:string]: Offense} = 
    {
        'offense1': {
            team: 'offense1',
            passingCompletions: 100,
            passingAttempts: 100,
            passingYards: 100,
            passingTouchdowns: 10,
            interceptions: 1,
            rushingAttempts: 100,
            rushingYards: 100,
            rushingTouchdowns: 10,
            passingRank: 99,
            rushingRank: 99
        },
        'offense2': {
            team: 'offense2',
            passingCompletions: 200,
            passingAttempts: 200,
            passingYards: 200,
            passingTouchdowns: 20,
            interceptions: 2,
            rushingAttempts: 200,
            rushingYards: 200,
            rushingTouchdowns: 20,
            passingRank: 99,
            rushingRank: 99
        },
        'offense3': {
            team: 'offense3',
            passingCompletions: 300,
            passingAttempts: 300,
            passingYards: 300,
            passingTouchdowns: 30,
            interceptions: 3,
            rushingAttempts: 300,
            rushingYards: 300,
            rushingTouchdowns: 30,
            passingRank: 99,
            rushingRank: 99
        }
    }

    const results = calculateTeamRanks(offenses)
    expect(results['offense1'].passingRank).toBe(3)
    expect(results['offense1'].rushingRank).toBe(3)
    expect(results['offense2'].passingRank).toBe(2)
    expect(results['offense2'].rushingRank).toBe(2)
    expect(results['offense3'].passingRank).toBe(1)
    expect(results['offense3'].rushingRank).toBe(1)
})