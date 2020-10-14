import {useState, useEffect} from 'react'

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
      <li>{player.Name}({parseInt(Number(player.Ratio)*100)}%)</li>
    </ul>
  ))
}

const Column = ({name, children}) => (
  <div className='rounded bg-gray-200 p-8 overflow-auto'>
    <div className=''>
      <h2 className='text-xl underline uppercase font-semibold'>{name}</h2>
    </div>
    <div>
      {children}
    </div>
  </div>
)

// const Quarterbacks = ({qbs}) => (<PositionList players={qbs} />

// const RunningBacks = ({rbs}) => {
//   return rbs.map((rb, index) => (
//     <ul>
//       <li>{rb.Name}</li>
//     </ul>
//   ))
// }

// const WideReceivers = ({wrs}) => {
//   return wrs.map((wr, index) => (
//     <ul>
//       <li>{wr.Name}</li>
//     </ul>
//   ))
// }

// const TightEnds = ({tes}) => {
//   return tes.map((te, index) => (
//     <ul>
//       <li>{te.Name}</li>
//     </ul>
//   ))
// }


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
        <div>
          <div className='flex flex-row flex-no-wrap justify-evenly h-screen p-8'>
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
          </div>
          <div>
            {data.schedule.map((game, index) => {
              const qbs = Object.values(data.players)
                .filter(qb => qb.TeamNickname === game.home || qb.TeamNickname === game.away)

              return (
                <div>
                  <h3 key={index}>{game.home} vs {game.away}</h3>
                  <ul>{qbs.map((qb, index) => <li key={index} >{qb.Name}</li>)}</ul>
                </div>
              )
            })}
          </div>
        </div>
      }
    </div>
  )
}
  
  export default HomePage