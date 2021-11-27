import { supabase } from "../../lib/util/initSupabase"
import BackButton from "../../components/backButton"

const StatRow = ({stat, home_team_stat, home_team_name, away_team_stat, away_team_name}) => {
    return <>
        <div className={`p-8 space-x-2 text-xl text-center text-gray-800 ${home_team_stat > away_team_stat ? `${home_team_name.toLowerCase()}_background_color` : null}`}>
            {home_team_stat}
        </div>
        <div className={`p-8 space-x-2 text-m text-center text-gray-800`}>
            {stat}
        </div>
        <div className={`p-8 space-x-2 text-xl text-center text-gray-800 ${home_team_stat < away_team_stat ? `${away_team_name.toLowerCase()}_background_color` : null}`}>
            {away_team_stat}
        </div>
    </>
}
const GamePage = ({gameData}) => {
    if(!gameData) return <div>Loading Game</div>

    const home_stats = gameData.home_team_stats[0]
    const away_stats = gameData.away_team_stats[0]

    return (
        <>
            <div className="m-5"><BackButton /></div>
            <section className="w-full pt-16 pb-20 bg-gray-50">
                <div className="">
                    <div className="grid gap-5 mt-12 grid-cols-3">
                        <div>
                            <h1 className={`text-center font-bold text-xl ${gameData.home_team.toLowerCase()}_primary_color`}>{gameData.home_team.replaceAll("_", " ")}</h1>
                        </div>
                        <div></div>
                        <div>
                            <h1 className={`text-center font-bold text-xl ${gameData.away_team.toLowerCase()}_primary_color`}>{gameData.away_team.replaceAll("_", " ")} </h1>
                        </div>

                        <div className="col-span-full"><hr /></div>
                        <div><h1 className="text-center font-bold text-xl">Offense</h1></div>
                        <div></div>
                        <div><h1 className="text-center font-bold text-xl">Defense</h1></div>
                        
                        <StatRow stat={"Average Total Yards"} 
                            home_team_stat={Math.round(home_stats.offense.averageTotalYards)} 
                            away_team_stat={Math.round(away_stats.defense.averageTotalYards)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Average Passing Yards"}
                            home_team_stat={Math.round(home_stats.offense.averagePassingYards)} 
                            away_team_stat={Math.round(away_stats.defense.averagePassingYards)} 
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team}/>
                        <StatRow stat={"Average Rushing Yards"}
                            home_team_stat={Math.round(home_stats.offense.averageRushingYards)} 
                            away_team_stat={Math.round(away_stats.defense.averageRushingYards)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Overall Rank"}
                            home_team_stat={Math.round(home_stats.offense.offensiveRank)} 
                            away_team_stat={Math.round(away_stats.defense.defensiveRank)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Passing Rank"}
                            home_team_stat={Math.round(home_stats.offense.passingRank)} 
                            away_team_stat={Math.round(away_stats.defense.passingRank)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Rushing Rank"}
                            home_team_stat={Math.round(home_stats.offense.rushingRank)} 
                            away_team_stat={Math.round(away_stats.defense.rushingRank)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        
                        <div className="col-span-full"><hr /></div>
                        <div><h1 className="text-center font-bold text-xl">Defense</h1></div>
                        <div></div>
                        <div><h1 className="text-center font-bold text-xl">Offense</h1></div>
                        <StatRow stat={"Average Total Yards"} 
                            home_team_stat={Math.round(home_stats.defense.averageTotalYards)} 
                            away_team_stat={Math.round(away_stats.offense.averageTotalYards)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Average Passing Yards"} 
                            home_team_stat={Math.round(home_stats.defense.averagePassingYards)}
                            away_team_stat={Math.round(away_stats.offense.averagePassingYards)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Average Rushing Yards"}
                            home_team_stat={Math.round(home_stats.defense.averageRushingYards)}
                            away_team_stat={Math.round(away_stats.offense.averageRushingYards)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Overall Rank"}
                            home_team_stat={Math.round(home_stats.defense.defensiveRank)}
                            away_team_stat={Math.round(away_stats.offense.offensiveRank)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Passing Rank"}
                            home_team_stat={Math.round(home_stats.defense.passingRank)} 
                            away_team_stat={Math.round(away_stats.offense.passingRank)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                        <StatRow stat={"Rushing Rank"}
                            home_team_stat={Math.round(home_stats.defense.rushingRank)} 
                            away_team_stat={Math.round(away_stats.offense.rushingRank)}
                            home_team_name={gameData.home_team} away_team_name={gameData.away_team} />
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticPaths() {
    // TODO: make this its own function
    const { data, error } = await supabase
        .from("current_week_schedule")
        .select()
        .order('date', {ascending: true})

    return {
        paths:data.map(game => {
            return {params: {id: game.id} }
        }),
        fallback: false,
    }
};

export async function getStaticProps({params}) {
    // TODO: make this its own function
    const { data, error } = await supabase
        .from("games")
        .select()
        .eq('id', params.id)

        if(error) return { props: { error } }

        if(!data && data.length === 0) return {
            props: {
                gameData: {error: 'No results found'},
            },
            revalidate: 1
        }

        const getStats = async (teamId) => {
            return await supabase
                .from("team_stats")
                .select(`
                    name
                    ,week
                    ,offense
                    ,defense
                    ,teams (
                        id
                        ,primarycolor
                    )
                `)
                .eq('teamId', teamId)
                .order('week', {ascending: false})
                .then(res => res.data)
        } 

        const [home_team_stats, away_team_stats] = await Promise.all([
            getStats(data[0].home_team_id),
            getStats(data[0].away_team_id)
        ])

    return {
        props: {
            gameData: {...data[0], 
                home_team_stats, 
                away_team_stats
            },
        },
        revalidate: 1
    }
}

export default GamePage