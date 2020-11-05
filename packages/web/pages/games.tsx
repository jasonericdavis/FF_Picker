import {useState, useEffect} from 'react'
import Game from '../src/components/game'

const getData = async () =>  {
    return fetch('/games.json').then(response => response.json())
}

const Loading = () => <div>Loading Data</div>

const GamePage = () => {
    const [data, setData] = useState(null)
  
    useEffect(() => {
      getData().then(data => {
        setData(data)
      })
    }, [])
  
    if(!data) return <div>Loading</div>
    
    return (
      <div className='bg-gray-700'>
        <div>Fantasy Football Picker</div>
        {(!data)? <Loading /> 
        :<div className="p-8">
            <div>
                {data.map((game, index) => <Game key={index} game={game} />)}
            </div>
          </div>
        }
      </div>
    )
  }
    
export default GamePage