import {useState} from 'react'

export const PlayerTable = ({players, sortHandler}) => {
    const [display, setDisplay] = useState('Total Yards')
  
    const onClickSort = (e) => {
      const {currentTarget} = e
      setDisplay(currentTarget.dataset.display)
      sortHandler(currentTarget.dataset.column)
    }
  
    return(
      <div className="bg-white rounded-md p-8">
        <h3>Top {players.length} Players for {display}</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th><button onClick={onClickSort} data-display="Passing Yards" data-column="passingYards">Passing Yards</button></th>
              <th><button onClick={onClickSort} data-display="Passing Yards Diff" data-column="passingYardsDiff">Passing Yards Diff</button></th>
              <th><button onClick={onClickSort} data-display="Rushing Yards" data-column="rushingYards">Rushing Yards</button></th>
              <th><button onClick={onClickSort} data-display="Rushing Yards" data-column="rushingYardsDiff">Rushing Yards Diff</button></th>
              <th><button onClick={onClickSort} data-display="Receiving Yards" data-column="receivingYards">Receiving Yards</button></th>
              <th><button onClick={onClickSort} data-display="Receiving Yards Diff" data-column="receivingYardsDiff">Receiving Yards Diff</button></th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.passingYards}</td>
                <td>{player.passingYardsDiff}</td>
                <td>{player.rushingYards}</td>
                <td>{player.rushingYardsDiff}</td>
                <td>{player.receivingYards}</td>
                <td>{player.receivingYardsDiff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
)}
  