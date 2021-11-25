//import fs from 'fs';
import path from 'path';
// import  parsePlayerData from './parsePlayerData';
// import parseOffensiveData from './parseOffensiveData';
// import parseDefsiveData from './parseDefensiveData';
//import getUnits from './getUnits';
import { getPreviousWeeksSchedule } from './getSchedule';
//import parseGameData from './parseGameData';
import { uploadTeamsToSupabase, uploadPlayersToSupabase, uploadCache } from './uploadToSupabase';
// import {teams as teamsCache} from './teams';
import getStats from './getStats';
import parseData from './parseData';
import cacheStats from './cacheStats';

async function execute() {
    // const offensiveStats = await downloadData(
    //     `${baseUrl}#`, 'team_stats'
    // );
    // fs.writeFileSync(path.join(cacheDir, 'offensive-stats.csv'), offensiveStats);
    // const offenses = parseOffensiveData(offensiveStats);

    // const defensiveStats = await downloadData(
    //     `${baseUrl}opp.htm`, 'team_stats'
    // );
    // fs.writeFileSync(path.join(cacheDir,'defensive-stats.csv'), defensiveStats);
    //const defenses = parseDefsiveData(defensiveStats);

    const scheduledGames = await getPreviousWeeksSchedule();
    const previousWeek = scheduledGames.length > 0 ? scheduledGames[0].week : 0;
    console.log(`Processing Week: ${previousWeek}`);

    const {offensiveStats, defensiveStats, playerStats} = await getStats();
    const {teams, players} = await parseData(
        offensiveStats, defensiveStats, playerStats, previousWeek
    );

    const cache = await cacheStats(
        offensiveStats, defensiveStats, playerStats, teams
    )

    //const teams = createTeams(previousWeek, offenses, defenses);
    
    // fs.writeFileSync(path.join(cacheDir,'teams.json'), JSON.stringify(teams));

    // const playerStats = await downloadData(
    //     `${baseUrl}fantasy.htm`, 'fantasy'
    // );
    // fs.writeFileSync(path.join(cacheDir,'player-stats.csv'), playerStats);
    // const players = parsePlayerData(playerStats, teamsCache);

    
    uploadTeamsToSupabase(teams);
    uploadPlayersToSupabase(players, previousWeek);
    uploadCache(previousWeek, cache);
    // uploadFileToStorage(path.join(cacheDir, 'offensive-stats.csv'), previousWeek)
    // uploadFileToStorage(path.join(cacheDir, 'defensive-stats.csv'), previousWeek)
    // uploadFileToStorage(path.join(cacheDir, 'player-stats.csv'), previousWeek)
};

execute();

