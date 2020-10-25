import Column from './column'
import Player from './player'

const Game = ({game}) => {
    return (
        <Column name={`${game.home.name} vs ${game.away.name} @ ${game.kickoff}`}>
            <div>
                <p>{game.away.name} Total Offense:{game.ratios.awayOffense}</p>
                <p>{game.away.name} Passing Yards:{game.ratios.awayPassingOffense}</p>
                <p>{game.away.name} Rushing Yards:{game.ratios.awayRushingOffense}</p>
            </div>
            <div>
                <p>{game.home.name} Total Offense {game.ratios.homeOffense}</p>
                <p>{game.home.name} Passing Yards:{game.ratios.homePassingOffense}</p>
                <p>{game.home.name} Rushing Yards:{game.ratios.homeRushingOffense}</p>
            </div>
        </Column>
    )
}

export default Game