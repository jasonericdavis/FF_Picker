import {season} from './2021-Schedule'
import dayjs from 'dayjs'

export const getCurrentWeeksSchedule = async () => {
    const currentWeek = season.filter(week => dayjs(week.date).isAfter(dayjs(), 'day')).sort((a, b) => a.week - b.week)[0]
    return season.filter(game => game.week === currentWeek.week)
}


export const getPreviousWeeksSchedule = async () => {
    const previousWeek = season.filter(week => dayjs(week.date).isBefore(dayjs(), 'day')).sort((a, b) => b.week - a.week)[0]
    return season.filter(game => game.week === previousWeek.week)
}

export const getScheduleForWeek = async (week: number) => {
    return season.filter(game => game.week === week)
}
