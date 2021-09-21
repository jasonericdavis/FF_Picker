import {createOffenseFromStats, parseOffensiveData} from "../src/parseOffensiveData";
import fs from 'fs';
import path from 'path'

test('createOffenseFromStats', () => {
    const statPtr = {
        Rk: 0,
        Tm: 1,
        G: 2,
        PF: 3,
        Yds: 4,
        Ply: 5,
        'Y/P': 6,
        TO: 7,
        FL: 8,
        '1stD': 9,
        Cmp: 10,
        Att: 11,
        Yds_1: 12,
        TD: 13,
        Int: 14,
        'NY/A': 15,
        '1stD_1': 16,
        Att_1: 17,
        Yds_2: 18,
        TD_1: 19,
        'Y/A': 20,
        '1stD_2': 21,
        Pen: 22,
        Yds_3: 23,
        '1stPy': 24,
        'Sc%': 25,
        'TO%': 26,
        EXP: 27
      }
    const statsCSVRow = `31,Atlanta Falcons,1,6,260,64,4.1,,0,19,21,35,136,0,0,3.6,8,26,124,0,4.8,7,12,99,4,18.2,0.0,-12.48`
    const defense = createOffenseFromStats(statsCSVRow.split(','), statPtr);
    expect(defense.gamesPlayed).toBe(1);
    expect(defense.totalYards).toBe(260);
    expect(defense.passingYards).toBe(136);
})

test('parseOffensiveData', () => {
    const sampleFile = path.join(__dirname,'samples/offensive-stats.csv')
    const offensiveData = fs.readFileSync(sampleFile, 'utf8');
    const offenses = parseOffensiveData(offensiveData);
    const numberOfTeams = 32
    const leagueTotalRows = 3
    expect(Object.values(offenses).length).toBe(numberOfTeams + leagueTotalRows);
    expect('Atlanta Falcons' in offenses).toBe(true);
})