import { supabase } from "../../lib/util/initSupabase"

export default async (req, res) => {

    const { data, error } = await supabase
    .from("games")
    .select()
    .order('week', {ascending: true})
  
    res.json(data);
}