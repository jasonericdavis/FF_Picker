import fs from 'fs'
import path from'path'
import {getData} from './getPFParseData'

getData()
    .then(data => {
        const filename = path.join(__dirname, 'public/data.json')
        console.log(`writing to: ${filename}`)
        fs.writeFile(filename, JSON.stringify(data), (error) => {
            console.log(`there was an error writing to file(${filename}): ${error}`)
        })
    })
    .catch(error => 
        console.log(`There was an error: ${error}`)
    )