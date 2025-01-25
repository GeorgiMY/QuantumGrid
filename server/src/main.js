const express = require('express')
const app = express()
const functions = require('./functions');

const PORT = 3000
app.locals.jsonUntill = 1
app.locals.jsonIncrementation = 100
app.locals.cronStarted = false

app.get('/', (req, res) => {
    res.send("This is a server")
})

app.post('/network/join', async (req, res) => {
    const body = await req.body;
    // Checks

    res.json(
        body.osType,
        body.cpu,
        body.ram,
        body.disks,
        body.gpu,
        body.ipAddress,
        body.localTime
    );
});

app.get('/work', (req, res) => {
    res.send("Explain what to do")
});

app.post('/work/recieve', (req, res) => {

});

app.get('/work/distribute', async (req, res) => {
    // Check if the computer has joined
    // Get his params and distribute his portion
    try {
        const data = await functions.readDataFileLines(app.locals.jsonUntill, app.locals.jsonUntill + app.locals.jsonIncrementation);
        app.locals.jsonUntill += app.locals.jsonIncrementation;
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send("All files have currently been distributed.");
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
