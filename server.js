//import modules
const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
//const path = require("path");
//const htmlRoutes = require("./routes/htmlRoutes"); //import HTML routes
//const apiRoutes = require("./routes/apiRoutes"); //import API routes

const PORT = 3001;

//create express application
const app = express();

//configure middleware to hanlde JSON and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Serve the index.html file for all other routes (wildcard)
//app.get("*", (req, res) => {
// res.sendFile(__dirname + "/public/index.html");
//});

// Serve the notes.html file when the user accesses "/notes"
//app.get("/notes", (req, res) => {
//res.sendFile(__dirname + "/public/notes.html");
//});

//GET route to read and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json(notesData);
});

//POST route to receive a new note, add it to db.json, and return new note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4(); //generate unique ID for new note
  const notesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  notesData.push(newNote);
  fs.writeFileSync("db.json", JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

//app.use("/html", htmlRoutes);
//app.use("/api", apiRoutes);

//listen on specific port for incoming HTTP requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
