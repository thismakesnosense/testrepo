const express = require ("express");
const fs = require ("fs");
const bodyParser = require ("body-parser");

const app = express();
let PORT = process.env.PORT || 3000;


const databasejson = {
    read:function() {
    let database = fs.readFileSync(__dirname+"/db/db.json");
    let jsondb = JSON.parse(database);
    return jsondb; 
    }
}

let db = databasejson.read();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use("/assets",express.static(__dirname+"/public/assets"));

app.get('/', (req, res) => res.sendFile(__dirname+"/public/index.html"));

app.get('/notes', (req, res) => res.sendFile(__dirname+"/public/notes.html"));

app.get('/api/notes', (req, res) => {
    let jsondb = db;
    res.json(jsondb);
});


app.post('/api/notes', (req, res) => {
    // console.log(req.body);  
    let newNote = req.body;
    db.push(newNote);
    console.log(db);
    res.json(newNote);
    
});

app.delete('/api/notes/:id', (req, res) => {
     let id = req.params.id;
     let updatedDB = db.filter(note => {
         if (note.id === id){
             return false
         }
         else {
             return true
         }
     })
     db = updatedDB;
     fs.writeFileSync("./db/db.json", JSON.stringify(db));
     res.json(db);
});












app.listen(PORT, () => console.log(`Example app listening on port 3000!`))

