const router = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");
const db = require("../db/db.json");
//GET route to read and return all saved notes as JSON
router.get("/api/notes", async (req, res) => {
  const notesData = await JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  res.json(notesData);
});

//POST route to receive a new note, add it to db.json, and return new note
router.post("/api/notes", (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid.v4(), //generate unique ID for new note
  };
  notesData.push(newNote);
  console.log(notesData);

  fs.writeFileSync("db/db.json", JSON.stringify(notesData, null, 2));
  res.json(notesData);
});

//DELETE note by ID, filter out note with matching ID, and write updated data back to db.json file
router.delete("/api/notes/:id", (req, res) => {
  const data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON = JSON.parse(data);
  const newNotes = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
  res.json("Note deleted.");
});

module.exports = router;
