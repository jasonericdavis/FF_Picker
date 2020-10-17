import Column from './column'
import Player from './player'

const Game = ({game}) => {
    return (
        <Column name={''}>
            <Column name={`${game.home}`}>

            </Column>
            <Column name={`${game.away}`}>
                
            </Column>
        </Column>
    )
}

export default Game