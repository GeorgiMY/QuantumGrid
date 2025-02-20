/*export function generateServerJSONFile(volunteerProject: string, typeOfDistribution: string, typeOfData: string, collectionName: string, localJsonDistribution: string, JSONPath: string): void {
    const data = JSON.stringify(
        {
            "volunteer-project": volunteerProject,
            "type-of-distribution": typeOfDistribution,
            "type-of-data": typeOfData,
            "collection-name": collectionName,
            "local-json-distribution": localJsonDistribution,
            JSONPath: JSONPath,
        }
    );

    fs.writeFile("./server-config.json", data, (err) => {
        if (err) {
            console.error("Error writing JSON file:", err);
            throw err;
        }
        console.log("server-config.json has been successfully created.");
    });
}*/
