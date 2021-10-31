import { supabase } from "../../lib/util/initSupabase"

const TeamData = ({name, offense, defense}) => {
    return (
        <>
            <div className="absolute inset-0 w-full h-full transform translate-x-2 translate-y-2 bg-blue-200 rounded-2xl"></div>
            <div className="absolute inset-0 w-full h-full border-2 border-gray-500 rounded-2xl"></div>
            <div className="relative flex pb-5 space-x-5 border-b border-gray-500 lg:space-x-3 xl:space-x-5">
                <h1>{name}</h1>
            </div>
            <ul className="relative py-2 space-y-3">
                <li><h2>Offense</h2></li>
                <li className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>{`Average Total Yards: ${Math.round(offense.averageTotalYards)}`}</span>
                </li>
                <li className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>{`Average Passing Yards: ${Math.round(offense.averagePassingYards)}`}</span>
                </li>
                <li className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>{`Average Rushing Yards: ${Math.round(offense.averageRushingYards)}`}</span>
                </li>
            </ul>
            <hr className="relative py-2 space-y-3"/>
            <ul className="relative py-2 space-y-3">
                <li><h2>Defense</h2></li>
                <li className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>{`Average Total Yards: ${Math.round(defense.averageTotalYards)}`}</span>
                </li>
                <li className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>{`Average Passing Yards: ${Math.round(defense.averagePassingYards)}`}</span>
                </li>
                <li className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <span>{`Average Rushing Yards: ${Math.round(defense.averageRushingYards)}`}</span>
                </li>
            </ul>
        </>
    )
}

const GamePage = ({gameData}) => {
    if(!gameData) return <div>Loading Game</div>

    return (
        <section className="w-full pt-16 pb-20 bg-gray-50">
            <div className="bg-gray-200">
                <div className="grid gap-5 mt-12 grid-cols-2">
                    <div className="relative flex flex-col justify-between p-8 lg:p-6 xl:p-8 rounded-2xl">
                        <TeamData name={gameData.home_team} offense={gameData.home_offense} defense={gameData.home_defense}/>
                    </div>
                    <div className="relative flex flex-col justify-between p-8 lg:p-6 xl:p-8 rounded-2xl">
                        <TeamData name={gameData.away_team} offense={gameData.away_offense} defense={gameData.away_defense}/>
                    </div>
                </div>
            </div>
        </section>
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
        .rpc(`fn_getteamstatsforgame`, { gameid: params.id })
    return {
        props: {
            gameData: data[0] || {error: 'No results found'},
        },
        revalidate: 1
    }
}

export default GamePage