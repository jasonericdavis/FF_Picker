import { supabase } from "../../../lib/util/initSupabase"

export default async (req, res) => {

    const { data, error } = await supabase
    .from("games")
    .select()
    .order('week', {ascending: true})
  
    if (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    } else {
        res.status(200).json({ data })
    }
}