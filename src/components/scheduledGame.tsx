import { forwardRef } from "react"

const ScheduledGame = forwardRef(({ onClick, href, game }:any, ref:any) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <div className="flex justify-evenly py-3 hover:bg-blue-100 border-b">
            <div className={`flex-grow rounded-xl border-b py-5 text-center text-xl max-w-xs ${game.away_team.toLowerCase()}_background_color`}>{game.away_team.replaceAll('_', ' ')}</div>
            <div className="py-5 text-center text-2xl">@</div>
            <div className={`flex-grow rounded-xl border-b py-5 text-center text-xl max-w-xs ${game.home_team.toLowerCase()}_background_color`}>{game.home_team.replaceAll('_', ' ')} </div>
        </div></a>
    )
})

export default ScheduledGame