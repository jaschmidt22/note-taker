//import modules
const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const PORT = 3001;

//create express application
const app = express();

//configure middleware to hanlde JSON and static files
app.use(express.json());
app.use(express.static("public"));

//GET route to read and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json(notesData);
});

//POST route to receive a new note, add it to db.json, and return new note
app.post("api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4(); //generate unique ID for new note
  const notesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  notesData.push(newNote);
  fs.writeFileSync("db.json", JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

//listen on specific port for incoming HTTP requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
