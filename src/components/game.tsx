import Column from './column'
import Player from './player'

const Game = ({game, players}) => {
    return (
        <Column name={`${game.home} vs ${game.away}`}>
            <ul>
                {players.map((player, index) => (
                <li key={index} >
                    <Player player={player} />
                </li>
                ))}   
            </ul>
        </Column>
    )
}

export default Game