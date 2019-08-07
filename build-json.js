const getData = async (FILENAME, VARLIST) => {
    // Compile All Variable Names
    const varData = await fetch(`files/${VARLIST}.csv`)
    const varText = await varData.text();

    const parsedVariables = {code: [], symbol: [], text: []};

    let varRows = varText.split('\n')
    varRows = varRows.slice(0, varRows.length - 1)

    varRows.forEach(row => {
        const cols = row.split(',')
        parsedVariables.code.push(cols[1]) 
        parsedVariables.symbol.push(cols[2])
        parsedVariables.text.push(cols[3])
    })

    // Get Data and Parse
    const tableData = await fetch(`files/${FILENAME}.csv`)
    const tableText = await tableData.text();

    const parsedVariablesFromTable = [];

    let tableRows = tableText.split('\n');
    const variableTypes = tableRows[0].split(',');
    tableRows = tableRows.slice(1, tableRows.length - 1)

    variableTypes.forEach((variable) => {
        parsedVariables.symbol.includes(variable) ? parsedVariablesFromTable.push(parsedVariables.text[parsedVariables.symbol.findIndex((sym) => { return sym === variable })]) : parsedVariablesFromTable.push(variable)
    })

    let parsedData = [];

    tableRows.forEach((row) => {
        const cols = row.split(',')
        const schoolID = cols[0]
        let objectData = []

        cols.forEach((col, iteration) => {
            objectData.push({ variable: parsedVariablesFromTable[iteration], value: col })
        })

        parsedData.push( { schoolID, value: objectData } )
    })

    const blobData = new Blob([JSON.stringify(parsedData)], {type: 'application/json'})
    const blobPath = window.URL.createObjectURL(blobData)

    const loadingText = document.querySelector(`#loading-${FILENAME}`)
    const link = `<a href=${blobPath} download='data-${FILENAME}.json'>Download Parsed Data for ${FILENAME}</a>`
    loadingText.innerHTML = link;

    console.log(parsedData)
}

const runScript = async () => {
    // Get File Names
    const filesRes = await fetch('/files/FILES.csv')
    const filesText = await filesRes.text()
    
    const files = filesText.split(',')
    const numFiles = files.length

    for(let i = 0; i < numFiles; i++) {
        const loading = document.createElement('p')
        loading.innerText = `Parsing ${files[i]}...`
        loading.id = `loading-${files[i]}`
        document.body.appendChild(loading)

        getData(files[i], 'VARLIST')
    }
}

runScript();