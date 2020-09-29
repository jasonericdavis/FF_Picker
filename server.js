const express = require('express')
const fs = require('fs');
const path = require('path')
const Bundler = require('parcel-bundler');
const getParseData = require('./src/getPFParseData')

const app = express();
const port = 3000;



/*  
*   This middleware goes before the static middleware
*   Becuase if the file exist then it will send the response and 
*   any middleware after it will not be executed.
*/
app.use(async (req, res, next) => {
    try {
        if(req.path.endsWith('.csv')) {
            const filename = path.join(__dirname,'data',req.path)
            if(fs.existsSync(filename)){
                // asynchronously read the file 
                // the await command causes the program to leave from this 
                // function until readFile is complete and then it will 
                // come and finish executing the function
                await fs.readFile(filename, 'utf8', (err, data) => {
                    res.send(data)
                })
                return
            }                
        }
        next()

    } catch(error) {
        next(error)
    }
})

// const bundler = new Bundler(path.join(__dirname, 'public/index.html'), {})
// app.use(bundler.middleware());

app.use(express.static('public'))

app.get('/1', (req, res) => {
    getParseData.getOffense()
    .then(data => {
        res.send(data)
    })
})

app.listen(port, () => {
    console.log(`App started on port: ${port}`)
})