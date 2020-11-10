const fs = require('fs').promises;

export const getCSVData =  async (filename, callback) => { 
    console.log(`Reading CSV file: ${filename}`)
    return await fs.readFile(filename, 'utf8', callback)
}