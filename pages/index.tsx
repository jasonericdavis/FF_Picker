import {useState, useEffect} from 'react'

const getData = async () =>  {
  return fetch('/data.json').then(response => response.json())
}

const Loading = () => <div>Loading Data</div>

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

const Quarterbacks = ({qbs}) => {
  return qbs.map((qb, index) => (
    <ul>
      <li>{qb.Name}</li>
    </ul>
  ))
}

const RunningBacks = ({rbs}) => {
  return rbs.map((rb, index) => (
    <ul>
      <li>{rb.Name}</li>
    </ul>
  ))
}

const WideReceivers = ({wrs}) => {
  return wrs.map((wr, index) => (
    <ul>
      <li>{wr.Name}</li>
    </ul>
  ))
}

const TightEnds = ({tes}) => {
  return tes.map((te, index) => (
    <ul>
      <li>{te.Name}</li>
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
        <div className='flex flex-row flex-no-wrap justify-evenly h-screen p-8'>
          <Column name={'Quarterbacks'}>
            <Quarterbacks qbs={data.players.qbs} />
          </Column>
          <Column name={'Running Backs'}>
            <RunningBacks rbs={data.players.rbs} />
          </Column>
          <Column name={'Wide Recievers'}>
            <WideReceivers wrs={data.players.wrs} />
          </Column>
          <Column name={'Tight Ends'}>
            <TightEnds tes={data.players.tes} />
          </Column>
        </div>
      }
    </div>
  )
}
  
  export default HomePage