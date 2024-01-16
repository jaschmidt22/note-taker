const router = require("express").Router();
const path = require("path");

//route that sends 'notes.html' response
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
//route that sends 'index.html' as a response for all routes
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
