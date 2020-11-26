import Column from './column'
import Player from './player'

const Game = ({date, kickoff, away, home}) => {
    //const {away, home, ratios} = game

    return (
        <Column name={`${home.name} vs ${away.name} ${date} @ ${kickoff}`}>
            <div>
                {/* <p>{game.away.name} Total Offense:{game.away.offense.totalYards}</p> */}
                <p>{away.name} Total:{away.totalYardsDiff}</p>
                <p>{away.name} Passing:{away.passingYardsDiff}</p>
                <p>{away.name} Rushing:{away.rushingYardsDiff}</p>
                {/* <p>{game.away.name} Passing Yards:{game.ratios.awayPassingOffense}</p>
                <p>{game.away.name} Rushing Yards:{game.ratios.awayRushingOffense}</p>
                <p>{game.away.name} Passing Rank:{game.away.offense.passingRank}</p>
                <p>{game.away.name} Rushing Rank:{game.away.offense.rushingRank}</p> */}
            </div>
            <div>
                <p>{home.name} Total: {home.totalYardsDiff}</p>
                <p>{home.name} Passing: {home.passingYardsDiff}</p>
                <p>{home.name} Rushing: {home.rushingYardsDiff}</p>
                {/* <p>{game.home.name} Passing Yards:{game.ratios.homePassingOffense}</p>
                <p>{game.home.name} Rushing Yards:{game.ratios.homeRushingOffense}</p>
                <p>{game.home.name} Passing Rank:{game.home.offense.passingRank}</p>
                <p>{game.home.name} Rushing Rank:{game.home.offense.rushingRank}</p> */}
            </div>
        </Column>
    )
}

export default Game