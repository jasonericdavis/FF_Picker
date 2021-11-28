import { getCacheFiles, uploadPlayersToSupabase, uploadTeamsToSupabase } from "./uploadToSupabase";
import parseData from './parseData';

async function parseWeek(week: number) {
    console.log(`Processing Week: ${week}`)
    const [offensiveStats, defensiveStats, playerStats] = await getCacheFiles(week)
    
    if(offensiveStats && defensiveStats && playerStats) {
        const {teams, players} = await parseData(
            offensiveStats, defensiveStats, playerStats, week
        );
        // console.dir(teams)
        // console.log('----------')
        // console.dir(players)
        console.log(`Processing Week: ${week} Complete`)

        console.log('Uploading to Supabase...');
        uploadTeamsToSupabase(teams);
        uploadPlayersToSupabase(players, week);
    } else {
        console.log(`unable to parse week ${week}`)
    }
}

async function execute() {
    for(let week = 1; week <= 11; week++) {
        await parseWeek(week);
    }
}

execute();
