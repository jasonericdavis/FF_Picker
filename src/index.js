const getData = async () => {
    return await fetch('/data.json').then(response => response.json())
}

const showData = async () => {
    const data = await getData().then(data => data)
    // const dataEl = document.getElementById('data')
    // .then( ({qbs, rbs, wrs, tes, ds }) => {
    //     const qbEl = document.getElementById('qbs')
    //     qbs.map((player, index) => {
    //         qbEl.innerHTML += `<p>${index}. ${JSON.stringify(player)}</p>`
    //     })

    //     const wrEl = document.getElementById('wrs')
    //     wrs.map((player, index) => {
    //         wrEl.innerHTML += `<p>${index}. ${JSON.stringify(player)}</p>`
    //     })
    // });

    // getDefense()
    // .then(defenses => {
    //     const defensesEl = document.getElementById('defenses')
    //     defenses.map((def, index) => {
    //         defensesEl.innerHTML += `<p>${index}. ${JSON.stringify(def)}</p>`
    //     })
    // })
};

showData();




