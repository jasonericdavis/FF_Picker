const Player = ({player}) => {
    const createRatioPercentage = (player) => {
        return `${Math.floor(Number(player.Ratio) * 100)}%`
    }
    return (
        <p>{player.Name} ({createRatioPercentage(player)})</p>
    )
}

export default Player