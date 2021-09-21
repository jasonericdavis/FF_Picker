/**
 * This function takes a array of statHeaders and returns them as an object with the 
 * position of the stat in the staHeaders array
 * @param statHeaders array of stat headers that are to be used
 * @returns An object with the key of the stat header and its position in the header array
 */
export const createStatPointer = (statHeaders: Array<string>) => {
    let statPtr: {[key:string]: number} = {}
    statHeaders.map((col, colIndex) => {
        let tempColName = col
        let colNameCounter = 0

        /**  
         * Because the name of a column can appear multiple times in the list of columns
         * this logic will append a suffix to the column if it is already in the list of columns
         * */ 
        while(statPtr[`${tempColName}`]) {
            colNameCounter += 1
            tempColName = `${tempColName.replace(`_${colNameCounter - 1}`, '')}_${colNameCounter}`             
        } 
        statPtr[tempColName ] = colIndex
    })
    return statPtr
}