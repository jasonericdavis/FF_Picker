import {useState, useEffect} from 'react'

const getData = async () =>  {
    return fetch('/teams.json').then(response => response.json())
}

const Loading = () => <div>Loading Data</div>

const TeamsPage = () => {
    const [data, setData] = useState(null)
  
    useEffect(() => {
      getData().then(data => {
        setData(data)
      })
    }, [])
  
    if(!data) return <div>Loading</div>
    
    return (
      <div className='bg-gray-200'>
        <div>
          <h1 className="text-center">Fantasy Football Picker</h1>
          <h2 className="text-center font-bold">This IS A SAMPLE. THIS PAGE WILL CHANGE</h2>
      </div>
        {(!data)? <Loading /> 
        :<div className="p-8">
            <div>
                {data.sort((x,y) => x.offense.passingRank - y.offense.passingRank).map((team) => 
                    <ul>
                        <li>{team.name} | {team.offense.passingRank} - {team.offense.passingYards}</li>
                    </ul>                        
                )}
            </div>
          </div>
        }
      </div>
    )
  }
    
export default TeamsPage