import getParseData from './getPFParseData'

const dataEl = document.getElementById('data')
//const ignoreColumns = ['Name + ID', 'ID', 'Roster Position']
    getParseData()
    .then( ({qbs, rbs, wrs, tes, ds }) => {
        wrs.map((player, index) => {
            dataEl.innerHTML += `<p>${index}. ${JSON.stringify(player)}</p>`
        })
    });




