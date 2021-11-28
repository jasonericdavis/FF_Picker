import core = require('@actions/core');
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import {Player, Players, Team} from './types'

dotenv.config()

const supabaseUrl = process.env.DB_URL || ''
const supabaseKey = process.env.DB_PUBLIC_KEY || ''

// Create a single supabase client for interacting with your database 
const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadTeamsToSupabase = async (teams: {[key:string]: Team}) => {
    try {
        const teamsArray = Object.values(teams)
        await supabase.from('team_stats').insert(teamsArray)
    } catch (err:any) {
        core.error(err.message)
    }
}

export const uploadPlayersToSupabase = async (players: {[key:string]: Player}, week: number) => {
    try {
        const playerArray = Object.values(players)
        await supabase.from('player_stats').insert(playerArray)
    } catch (err:any) {
        core.error(err.message)
    }
}

async function uploadFileToStorage(weekNumber: number, file:{filename: string, data: string}) {
    try {
        const storageFilename = `2021/w${weekNumber}/${file.filename}`
        const { data, error } = await supabase.storage
            .from('ff-picker-weekly-stats')
            .upload(storageFilename, file.data)
        if (error) {
            core.notice(`Error Uploading (${storageFilename}): ${error.message}`)
        } else {
            core.info(file.filename)
        }
    } catch (err:any) {
        core.error(err.message)
    }
}

export function uploadCache(week: number, files: Array<{filename:string, data:string }>) {
    files.map(file => uploadFileToStorage(week, file))
}

export async function getCacheFiles(week: number) {
    const getCacheFile = async (filename: string) => {
        const { data, error } = await supabase.storage
            .from(`ff-picker-weekly-stats`)
            .download(`2021/w${week}/${filename}`)
            console.log(`${error ? `Error: ${error.message}` : `week ${week} -> ${filename} download succesful`}`)
        if(data)
            return data.text().then(t=>t)
        else 
            return null
    }

    return await Promise.all([
        getCacheFile('offensive-stats.csv'),
        getCacheFile('defensive-stats.csv'),
        getCacheFile('player-stats.csv')
    ])
}
