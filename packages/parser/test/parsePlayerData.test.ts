import {parsePlayerData} from '../src/parsePlayerData'

test('Parse Player Data from CSV String', () => {
    const data = 
    `Rk,Player,Tm,FantPos,Age,G,GS,Cmp,Att,Yds,TD,Int,Att,Yds,Y/A,TD,Tgt,Rec,Yds,Y/R,TD,Fmb,FL,TD,2PM,2PP,FantPt,PPR,DKPt,FDPt,VBD,PosRank,OvRank
1,Test Player\\TestPlayer01,MIN,RB,25,6,6,1.11,2.22,3.33,4.44,5.55,20.3,108.7,5.34,1.67,3.17,2.33,21.2,9.07,0.17,0.17,0.17,1.83,0.50,,24.7,27.0,168.9,25.8,13.2,0.17,0.17`
    
    const players = parsePlayerData(data)
    const player = players['TestPlayer01']
    expect(player).not.toBeNull()
    expect(player.name).toEqual('Test Player')
    expect(player.position).toEqual('RB')
    expect(player.passingCompletions).toEqual(1.11)
    expect(player.passingAttempts).toEqual(2.22)
    expect(player.passingYards).toEqual(3.33)
    expect(player.passingTouchdowns).toEqual(4.44)
    expect(player.passingInterceptions).toEqual(5.55)

    expect(player.rushingAttempts).toEqual(20.3)
    expect(player.rushingYards).toEqual(108.7)
    expect(player.rushingAverage).toEqual(5.34)
    expect(player.rushingTouchdowns).toEqual(1.67)

    expect(player.receivingTargets).toEqual(3.17)
    expect(player.receivingReceptions).toEqual(2.33)
    expect(player.receivingYards).toEqual(21.2)
    expect(player.receivingAverage).toEqual(9.07)
    expect(player.receivingTouchdowns).toEqual(0.17)
})