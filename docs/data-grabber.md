The data-grabber is used to download the following stats from [pro-footbal-reference](https://pro-football-reference.com)

- player stats
- team offensive stats
- team defensive stats

The stats that are pulled are the stats from the previous week. The stats are then parsed to pull out some necessary data and also add some additional data. 

Afterwards the teams offensive and defensive data is combined into a single object known as a team. These objects are then inserted the Supabase table `team_stats`. The player data is inserted in the Supabase table `player_stats`.

