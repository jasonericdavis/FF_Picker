import {createDefenseFromStats, parseDefensiveData} from "../src/parseDefensiveData";
import fs from 'fs';
import path from 'path'

test('createDefenseFromStats', () => {
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
    const statsCSVRow = `19,Atlanta Falcons,16,414,6374,1034,6.2,21,9,367,425,625,4697,34,12,7.2,239,380,1677,15,4.4,97,91,800,31,42.0,12.1,-148.58`
    const defense = createDefenseFromStats(statsCSVRow.split(','), statPtr);
    expect(defense.gamesPlayed).toBe(16);
    expect(defense.totalYards).toBe(6374);
    expect(defense.passingYards).toBe(4697);
})

test('parseDefensiveData', () => {
    const sampleFile = path.join(__dirname,'samples/defensive-stats.csv')
    const defensiveStats = fs.readFileSync(sampleFile, 'utf8');
    const defenses = parseDefensiveData(defensiveStats);
    const numberOfTeams = 32
    const leagueTotalRows = 3
    expect(Object.values(defenses).length).toBe(numberOfTeams + leagueTotalRows);
    expect('Atlanta Falcons' in defenses).toBe(true);
})