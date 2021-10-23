const ScheduledGame = ({ game }) => {
    return (
        <div className="flex justify-evenly py-5 px-3 my-5 rounded-xl bg-blue-50 hover:bg-blue-100 border-b">
            <div className="flex-grow text-center max-w-xs">{game.away_team.replaceAll('_', ' ')}</div>
            <div>@</div>
            <div className="flex-grow text-center max-w-xs">{game.home_team.replaceAll('_', ' ')} </div>
        </div>
    )
}

export default ScheduledGame