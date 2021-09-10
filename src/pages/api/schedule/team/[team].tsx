import { supabase } from "../../../../lib/util/initSupabase"

export default async (req, res) => {
    const { team } = req.query

    // I definately don't the way the OR operator works in Supabase
    const { data, error } = await supabase
    .from("games")
    .select()
    .or(`home_team.ilike.%${team}%, away_team.ilike.%${team}%`)
    .order('week', {ascending: true})
  
    if (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } else {
        res.status(200).json({ data })
    }

  }