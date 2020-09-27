const getDKWeekData = async (filename) => {
    const response = await fetch(filename).then(response => response.text()).then( data => data)
    return response
}
export default getDKWeekData