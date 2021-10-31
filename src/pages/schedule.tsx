import dayjs from 'dayjs'
import Link from 'next/link'
import ScheduledGame from '../components/scheduledGame'
import { supabase } from "../lib/util/initSupabase"


/**
 * 
 * @param games returns the array of games from the api as an object
 * with the gametimes as a key to an array of the games for that 
 * particular date and time
 * @returns 
 */
const returnGamesByDateTime = (games) => {
    return games.reduce((obj, curr) => {
        if(!obj[curr.date]) {
            obj[curr.date] = []
        }
        obj[curr.date] = [...obj[curr.date], curr]
        return obj
    }, {})
}

const ScheduleLink = ({game}) => {
    return (
        <Link href={`/game/${game.id}`} passHref>
            <ScheduledGame game={game} />
        </Link>
    )
}

const SchedulePage = ({schedule}) => {
    if(!schedule) return <div>Loading Schedule</div>

    return (
        <div className="flex-no-shrink p-2 mx-10">
            {Object.keys(schedule).map((date, dateIndex) => 
                <div key={dateIndex}>
                    <h2>{dayjs(date).format('dddd MMMM D hh:mma')}</h2>
                    {schedule[date].map((game, index) => {
                        return <ScheduleLink game={game} key={index} />
                    })}  
                </div>              
            )}
        </div>
    )
}

export async function getStaticProps({params}) {
    // TODO: make this its own function
    const { data, error } = await supabase
        .from("current_week_schedule")
        .select()
        .order('date', {ascending: true})

    return {
        props: {
            schedule: error ? {error } : returnGamesByDateTime(data),
        },
        revalidate: 1
    }
}

export default SchedulePage