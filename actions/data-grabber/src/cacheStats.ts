import fs from 'fs';
import path from 'path';

const cacheDir = path.join(__dirname, '../cache');

export default async function cacheStats(
    offensiveStats: string,
    defensiveStats: string,
    playerStats:string,
    teams: { [key: string]: any }
){
    if (!fs.existsSync(cacheDir)){
        fs.mkdirSync(cacheDir);
    }

    fs.writeFileSync(path.join(cacheDir, 'offensive-stats.csv'), offensiveStats);
    fs.writeFileSync(path.join(cacheDir,'defensive-stats.csv'), defensiveStats);
    fs.writeFileSync(path.join(cacheDir,'player-stats.csv'), playerStats);
    fs.writeFileSync(path.join(cacheDir,'team-stats.json'), JSON.stringify(teams));

    return [
        path.join(cacheDir, 'offensive-stats.csv'),
        path.join(cacheDir,'defensive-stats.csv'),
        path.join(cacheDir,'player-stats.csv'),
        path.join(cacheDir,'team-stats.json')
    ]
}