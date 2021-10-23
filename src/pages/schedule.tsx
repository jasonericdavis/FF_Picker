import dayjs from 'dayjs'
import {useState, useEffect} from 'react'
import ScheduledGame from '../components/scheduledGame'

const getData = async () =>  {
    return fetch('/api/schedule').then(response => response.json())
}

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

const SchedulePage = () => {
    const [data, setData] = useState(null)
  
    useEffect(() => {
      getData().then(response => {
        const gamesByDateTime = returnGamesByDateTime(response.data)
        setData(gamesByDateTime)
      })
    }, [])

    if(!data) return <div>Loading Schedule</div>

    return (
        <div className="flex-no-shrink p-2 mx-10">
            {Object.keys(data).map(date => 
                <>
                    <h2>{dayjs(date).format('dddd MMMM D hh:mma')}</h2>
                    {data[date].map((game, index) => {
                        return <ScheduledGame key={index} game={game} />
                    })}  
                </>              
            )}
        </div>
    )


}

export default SchedulePage