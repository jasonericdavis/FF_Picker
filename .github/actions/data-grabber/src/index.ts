import core = require('@actions/core');
import { getPreviousWeeksSchedule } from './getSchedule';
import { uploadTeamsToSupabase, uploadPlayersToSupabase, uploadCache } from './uploadToSupabase';
import getStats from './getStats';
import parseData from './parseData';

async function run() {
    console.log('Downloading schedule...');
    const scheduledGames = await getPreviousWeeksSchedule();
    const previousWeek = scheduledGames.length > 0 ? scheduledGames[0].week : 0;
    core.startGroup(`Processing Week: ${previousWeek}`);

    const {offensiveStats, defensiveStats, playerStats} = await core.group('Downloading Stats', async () => {
        return await getStats();
    });
    
    const {teams, players} = await core.group('Parsing Data', async () => {
        return await parseData(
            offensiveStats, defensiveStats, playerStats, previousWeek
        );
    });

    console.log('Uploading to Supabase...');
    uploadTeamsToSupabase(teams);
    uploadPlayersToSupabase(players, previousWeek);
    uploadCache(previousWeek, [
        {filename: 'offensive-stats.csv', data: offensiveStats},
        {filename: 'defensive-stats.csv', data: defensiveStats},
        {filename: 'player-stats.csv', data: playerStats},
        {filename: 'teams.json', data: JSON.stringify(teams)},
    ]);
    core.endGroup();
};

run().catch(error => core.setFailed(`Workflow failed!: ${error.message}`));

