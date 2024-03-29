//import modules
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes"); //import HTML routes
const apiRoutes = require("./routes/apiRoutes"); //import API routes

const PORT = process.env.PORT || 3001;

//create express application
const app = express();

//configure middleware to hanlde JSON and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(apiRoutes);
app.use(htmlRoutes);

//listen on specific port for incoming HTTP requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
