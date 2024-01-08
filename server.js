//import modules
const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
const htmlRoutes = require("./routes/htmlRoutes"); //import HTML routes
const apiRoutes = require("./routes/apiRoutes"); //import API routes

const PORT = 3001;

//create express application
const app = express();

//configure middleware to hanlde JSON and static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/html", htmlRoutes);
app.use("/api", apiRoutes);

//listen on specific port for incoming HTTP requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
