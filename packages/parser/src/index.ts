import fs from 'fs'
import path from 'path'
import {getData} from './getPFParseData'

let args = process.argv
console.log(args)
const folder = path.join(process.cwd(),'data', '2020-10')

getData(folder, path.join(process.cwd(),'data', 'pfSchedule.csv'))
    .then(({players, teams, games, units}) => {
        console.log(`creating data files`)
        fs.writeFile(path.join(folder, 'players.json'), JSON.stringify(players), (error) => {
            if(error) console.log(`there was an error writing to file: ${error}`)
        })

        fs.writeFile(path.join(folder, 'teams.json'), JSON.stringify(teams), (error) => {
            if(error) console.log(`there was an error writing to file: ${error}`)
        })

        fs.writeFile(path.join(folder, 'games.json'), JSON.stringify(games), (error) => {
            if(error) console.log(`there was an error writing to file: ${error}`)
        })

        console.log(units)
    })
    .catch(error => 
        console.log(`There was an error: ${error}`)
    )