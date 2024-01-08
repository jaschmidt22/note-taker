const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const router = require("express").Router();

//GET route to read and return all saved notes as JSON
router.get("/api/notes", (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json(notesData);
});

//POST route to receive a new note, add it to db.json, and return new note
router.post("api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4(); //generate unique ID for new note
  const notesData = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  notesData.push(newNote);
  fs.writeFileSync("db.json", JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

module.export = router;
