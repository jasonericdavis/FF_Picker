import {useState} from 'react'
import {Chart}  from './chart';
export const OffenseTable = ({teams, sortHandler}) => {
    const [display, setDisplay] = useState('Total Yards')
    const [selectedTeam,setSelectedTeam] = useState(null);
    const maxTotalYards = Math.max(...teams.map(t=>t.totalYards));
    const maxRushingYards = Math.max(...teams.map(t=>t.rushingYards));
    const maxPassingYards = Math.max(...teams.map(t=>t.passingYards));
    console.log(maxTotalYards,maxRushingYards,maxPassingYards);
    const maxes = {totalYards:maxTotalYards,rushingYards:maxRushingYards,passingYards:maxPassingYards};
    const onClickSort = (e) => {
      const {currentTarget} = e
      setDisplay(currentTarget.dataset.display)
      sortHandler(currentTarget.dataset.column)
    }
    return(
      <div className="bg-white rounded-md p-8">
        <h3>Top {teams.length} teams for {display}</h3>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th><button data-display="Total Yards" data-column="totalYards" onClick={onClickSort}>Total Yards</button></th>
              <th><button data-display="Total Yards Diff" data-column="totalYardsDiff"onClick={onClickSort}>Total Yards Diff</button></th>
              <th><button onClick={onClickSort} data-display="Passing Yards" data-column="passingYards">Passing Yards</button></th>
              <th><button onClick={onClickSort} data-display="Passing Yards Diff" data-column="passingYardsDiff">Passing Yards Diff</button></th>
              <th><button onClick={onClickSort} data-display="Rushing Yards" data-column="rushingYards">Rushing Yards</button></th>
              <th><button onClick={onClickSort} data-display="Rushing Yards" data-column="rushingYardsDiff">Rushing Yards Diff</button></th>
              <th className="chart-column">Chart</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team,index) => (
              <tr key={team.name}>
                <td onClick={()=>{
                  setSelectedTeam(team);
                }}>{team.name}</td>
                <td>{team.totalYards}</td>
                <td>{team.totalYardsDiff}</td>
                <td>{team.passingYards}</td>
                <td>{team.passingYardsDiff}</td>
                <td>{team.rushingYards}</td>
                <td>{team.rushingYardsDiff}</td>
                {
                  index == 0 ? 
                    <td rowSpan={teams.length}>
                      {selectedTeam ? 
                        <Chart team={selectedTeam} maxes={maxes} />
                        : "Choose Team"}
                    </td> 
                    : null
                }
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
)}
  