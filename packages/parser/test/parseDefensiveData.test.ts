import {parseDefensiveData, calculateTeamRanks} from '../src/parseDefensiveData'
import {Defense} from 'shared-lib'

test('test-parse-offensive-data', () => {
    const data = 
    `Rk,Tm,G,PF,Yds,Ply,Y/P,TO,FL,1stD,Cmp,Att,Yds,TD,Int,NY/A,1stD,Att,Yds,TD,Y/A,1stD,Pen,Yds,1stPy,Sc%,TO%,EXP
    1,Test Team,7,18.6,376.0,66.7,5.6,1.86,0.86,23.3,23.6,38.6,250.9,1.14,1.00,6.1,12.6,25.4,125.1,1.29,4.9,8.71,5.14,52.1,2.00,25.9,16.0,0.04`

    const defenses = parseDefensiveData(data)
    const offense = defenses['Test Team']
    expect(offense).not.toBeNull()
    expect(offense.totalYards).toBe(376.0)
    expect(offense.passingYards).toBe(250.9)
    expect(offense.passingTouchdowns).toBe(1.14)
    expect(offense.interceptions).toBe(1)

    expect(offense.rushingAttempts).toBe(25.4)
    expect(offense.rushingYards).toBe(125.1)
    expect(offense.rushingTouchdowns).toBe(1.29)
})

test('test-calulate-team-ranking', () => {
    const defenses:{[key:string]: Defense} = 
    {
        'defense1': {
            team: 'defense1',
            passingAttempts: 100,
            passingYards: 100,
            passingTouchdowns: 10,
            interceptions: 1,
            rushingAttempts: 100,
            rushingYards: 100,
            rushingTouchdowns: 10,
            passingRank: 99,
            rushingRank: 99,
            fumbles: 1,
            pointsAllowed: 100,
            takeAways: 1,
            totalYards: 100
        },
        'defense2': {
            team: 'defense2',
            passingAttempts: 300,
            passingYards: 300,
            passingTouchdowns: 30,
            interceptions: 3,
            rushingAttempts: 300,
            rushingYards: 300,
            rushingTouchdowns: 30,
            passingRank: 99,
            rushingRank: 99,
            fumbles: 3,
            pointsAllowed: 300,
            takeAways: 3,
            totalYards: 300
        },
        'defense3': {
            team: 'defense3',
            passingAttempts: 200,
            passingYards: 200,
            passingTouchdowns: 20,
            interceptions: 2,
            rushingAttempts: 200,
            rushingYards: 200,
            rushingTouchdowns: 20,
            passingRank: 99,
            rushingRank: 99,
            fumbles: 2,
            pointsAllowed: 200,
            takeAways: 2,
            totalYards: 200
        }
    }

    const results = calculateTeamRanks(defenses)
    expect(results['defense1'].passingRank).toBe(3)
    expect(results['defense1'].rushingRank).toBe(3)
    expect(results['defense2'].passingRank).toBe(1)
    expect(results['defense2'].rushingRank).toBe(1)
    expect(results['defense3'].passingRank).toBe(2)
    expect(results['defense3'].rushingRank).toBe(2)
})