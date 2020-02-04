const express = require ("express");
const fs = require ("fs");

const app = express()

app.use("/assets",express.static(__dirname+"/public/assets"));

app.get('/', (req, res) => res.sendFile(__dirname+"/public/index.html"));

app.get('/notes', (req, res) => res.sendFile(__dirname+"/public/notes.html"));

app.get('/api/notes', (req, res) => {
    let jsondb = databasejson.read();
    res.json(jsondb);
});


app.post('/api/notes', (req, res) => {
    JSON.read

})

const databasejson = {
    read() {
    let database = fs.readFileSync(__dirname+"/db/db.json");
    let jsondb = JSON.parse(database);
    }
}










app.listen(3000, () => console.log(`Example app listening on port 3000!`))

