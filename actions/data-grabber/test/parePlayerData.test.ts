import {parsePlayerData} from '../src/parsePlayerData';
import path from 'path'
import fs from 'fs'

test('parsePlayerData', () => {
    const sampleFile = path.join(__dirname,'samples/player-stats.csv')
    const playerData = fs.readFileSync(sampleFile, 'utf8');
    const players = parsePlayerData(playerData);
    expect(Object.values(players).length > 0).toBe(true);
})