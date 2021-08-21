import {useState, useEffect} from 'react'
import Game from '../components/game'

const getData = async () =>  {
    return fetch('/api/data').then(response => response.json())
}

const Loading = () => <div>Loading Game Data</div>


const GamePage = () => {
    const [data, setData] = useState(null)
  
    useEffect(() => {
      getData().then(response => {
        setData(response.games)
      })
    }, [])
  
    if(!data) return <div>Loading</div>
    
    return (
      <div className='bg-gray-700'>
        <div>Fantasy Football Picker</div>
        {(!data)? <Loading /> 
        :<div className="p-8 text-white grid grid-flow-col grid-cols-3">
            {data.map((game, index) => 
              <>
                <div>{game.away.name} @ {game.home.name} </div>
                <div>{game.date} {game.kickoff}</div>
                <div></div>
              </>
            )}
          </div>
        }
      </div>
    )
  }
    
export default GamePage