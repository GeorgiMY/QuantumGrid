const fs = require('fs')

export function generateServerJSONFile(volunteerProject, typeOfDistribution, typeOfData, collectionName, localJsonDistribution, JSONPath) {
    const data = `
    {
        "volunteer-project": ${volunteerProject},
        "type-of-distribution": ${typeOfDistribution},
        "type-of-data": ${typeOfData},
        "collection-name": ${collectionName},
        "local-json-distribution": ${localJsonDistribution},
        "JSONPath": ${JSONPath}
    }
    `
    fs.writeFile('./server-config.json', data, (err) => {
        if (err) throw err;
    })
}
