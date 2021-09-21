import { createClient } from '@supabase/supabase-js'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants'
import dotenv from 'dotenv'
import {Player, Team} from './types'

dotenv.config()

// Create a single supabase client for interacting with your database 
const supabase = createClient(
    process.env.DB_URL || '', 
    process.env.DB_PUBLIC_KEY || ''
)

export const uploadTeamsToSupabase = async (teams: {[key:string]: Team}) => {
    try {
        const teamsArray = Object.values(teams)
        await supabase.from('team_stats').insert(teamsArray)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPlayersToSupabase = async (players: {[key:string]: Player}) => {
    try {
        const playerArray = Object.values(players).reduce((acc, player) => {
            acc.push({playerId:player.id, week: player.games, stats: player})
            return acc
        }, [] as Array<{playerId: string, week: number, stats: Player}>)
        await supabase.from('player_stats').insert(playerArray)
    } catch (error) {
        console.log(error)
    }
}
