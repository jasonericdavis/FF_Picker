import {useState, useEffect} from 'react'
import {OffenseTable} from '../components/offenseTable'
import {PlayerTable} from '../components/playerTable'

const listSize = 20;

const getData = async () =>  {
  return fetch('/api/data').then(response => response.json())
}

const Loading = () => <div>Loading Data</div>

const PlayerTop10 = ({players}) => {
  const [sortOrder, setSortOrder] = useState('passingYards')
  const sortHandler = (col:string) => {
    setSortOrder(col)
  }
  return (
    <PlayerTable sortHandler={sortHandler} players={
        players.sort((a,b) => b[sortOrder] - a[sortOrder])
        .slice(0, 10)
      } />
  )
}

const HomePage = () => {
  const [games, setGames] = useState(null)
  const [sortOrder, setSortOrder] = useState('totalYards')

  useEffect(() => {
    getData().then(data => {
      setGames(data.games.filter(game => game.date == 'December 6' && game.kickoff > "3:00PM"))
    })
  }, [])

  const sortHandler = (col:string) => {
    setSortOrder(col)
  }

  if(!games) return <div>Loading</div>
  
  return (
    <div className='bg-gray-700'>
      <div>Fantasy Football Picker</div>
      {(!games)? <Loading /> 
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
          <hr />
          <h2>Simulation Results</h2>
          <div className="my-4">
            {/* {data.schedule.map((game, index) => {
              const players = Object.values(data.players)
                .filter(qb => qb.TeamNickname === game.home || qb.TeamNickname === game.away)
              return <Game players={players.sort((a,b) => b.Ratio - a.Ratio)} game={game} />
            })} */}
            <OffenseTable sortHandler={sortHandler} teams={
              games.reduce((a, currentValue) => {
                a.push(currentValue.home)
                a.push(currentValue.away)
                return a
              }, [])
              .sort((a,b) => b[sortOrder] - a[sortOrder])
              .slice(0, 10)
            } />
          </div>

          <div className="my-4">
            <PlayerTop10 players={
              games.reduce((a, currentValue) => {
                  a.push(...currentValue.home.players)
                  a.push(...currentValue.away.players)
                  return a
                }, [])
              } />
          </div>
        </div>
      }
    </div>
  )
}
  
  export default HomePage