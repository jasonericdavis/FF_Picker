import {useState, useEffect} from 'react'
import Game from '../src/components/game'

const listSize = 20;

const getData = async () =>  {
  return fetch('/data.json').then(response => response.json())
}

const Loading = () => <div>Loading Data</div>

const PositionList = ({players}) => {
  return players
    .sort((a,b) => b.Ratio - a.Ratio)
    .splice(0, listSize)
    .map((player, index) => (
    <ul>
      <li>{player.Name}({parseInt(player.Ratio)*100}%)</li>
    </ul>
  ))
}

const HomePage = () => {
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
        :
        <div className="p-8">
          {/* <div className='flex flex-row flex-no-wrap justify-evenly h-screen p-8'>
            <Column name={'Quarterbacks'}>
              <PositionList players={Object.values(data.players).filter(player => player.Position == 'QB')} />
            </Column>
            <Column name={'Running Backs'}>
              <PositionList players={Object.values(data.players).filter(player => player.Position == 'RB')} />
            </Column>
            <Column name={'Wide Recievers'}>
              <PositionList players={Object.values(data.players).filter(player => player.Position == 'WR')} />
            </Column>
            <Column name={'Tight Ends'}>
              <PositionList players={Object.values(data.players).filter(player => player.Position == 'TE')} />
            </Column>
          </div> */}
          <div>
            {/* {data.schedule.map((game, index) => {
              const players = Object.values(data.players)
                .filter(qb => qb.TeamNickname === game.home || qb.TeamNickname === game.away)
              return <Game players={players.sort((a,b) => b.Ratio - a.Ratio)} game={game} />
            })} */}
            {data.map((game, index) => {
                return <Game game={game} />
              }
            )}
          </div>
        </div>
      }
    </div>
  )
}
  
  export default HomePage