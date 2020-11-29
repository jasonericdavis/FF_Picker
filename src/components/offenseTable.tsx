import {useState} from 'react'

export const OffenseTable = ({teams, sortHandler}) => {
    const [display, setDisplay] = useState('Total Yards')
  
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
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.name}>
                <td>{team.name}</td>
                <td>{team.totalYards}</td>
                <td>{team.totalYardsDiff}</td>
                <td>{team.passingYards}</td>
                <td>{team.passingYardsDiff}</td>
                <td>{team.rushingYards}</td>
                <td>{team.rushingYardsDiff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
)}
  