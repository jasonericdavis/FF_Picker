var teams = require('../data/teams.json');
var createClient = require('@supabase/supabase-js').createClient
require('dotenv').config();


// Create a single supabase client for interacting with your database 
const supabase = createClient(process.env.DB_URL, process.env.DB_PUBLIC_KEY)

const loadData = async () => {
    const { data, error } = await supabase
    .from('teams')
    .insert(teams)
    
    if (error) {
        console.log(error)
    }
}

loadData();