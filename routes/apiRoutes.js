const router = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");

//GET route to read and return all saved notes as JSON
router.get("/api/notes", async (req, res) => {
  const notesData = await JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  res.json(notesData);
});

//POST route to receive a new note, add it to db.json, and return new note
router.post("api/notes", (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  notesData.push(newNote);

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid.v4(), //generate unique ID for new note
  };

  fs.writeFileSync("db.json", JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

module.exports = router;
