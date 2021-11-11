import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import {Player, Team} from './types'

dotenv.config()

const supabaseUrl = process.env.DB_URL || ''
const supabaseKey = process.env.DB_PUBLIC_KEY || ''

// Create a single supabase client for interacting with your database 
const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadTeamsToSupabase = async (teams: {[key:string]: Team}) => {
    try {
        const teamsArray = Object.values(teams)
        await supabase.from('team_stats').insert(teamsArray)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPlayersToSupabase = async (players: {[key:string]: Player}, week: number) => {
    try {
        const playerArray = Object.values(players).reduce((acc, player) => {
            acc.push({playerId:player.id, teamId:player.teamId, week, stats: player})
            return acc
        }, [] as Array<{playerId: string, teamId: string | null, week: number, stats: Player}>)
        await supabase.from('player_stats').insert(playerArray)
    } catch (error) {
        console.log(error)
    }
}

export const uploadFileToStorage = async (fileName: string, weekNumber: number) => {
    try {
        const file = fs.readFileSync(fileName)
        const { data, error } = await supabase.storage
            .from('ff-picker-weekly-stats')
            .upload(`2021/w${weekNumber}/${path.basename(fileName)}`, file)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
