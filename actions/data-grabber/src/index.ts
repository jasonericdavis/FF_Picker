import { getPreviousWeeksSchedule } from './getSchedule';
import { uploadTeamsToSupabase, uploadPlayersToSupabase, uploadCache } from './uploadToSupabase';
import getStats from './getStats';
import parseData from './parseData';
import cacheStats from './cacheStats';

async function execute() {
    console.log('Downloading schedule...');
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

    console.log('Uploading to Supabase...');
    uploadTeamsToSupabase(teams);
    uploadPlayersToSupabase(players, previousWeek);
    uploadCache(previousWeek, cache);
    console.log('Done!');
};

execute();

