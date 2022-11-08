require("dotenv").config();

//import express from express
const express = require("express");
const app = express();

//pull in simpsons api data from local json file
const { simpsons } = require("./data/simpsons");

// checktoken function to be used in the Update route
const { checkToken } = require("./middleware/auth");
const { addToLog } = require("./middleware/logging");

const { random } = require("./utils");

//add an ID to the simpsons data because it doesn't have it already
simpsons.forEach((element) => {
  element.id = random(100000000);
  element.characterDirection = element.characterDirection.toLowerCase();
});

//middleware with built-in functions
app.use(express.static("public")); //check public folder before checking routes
app.use(express.json()); //because data is in json format

//logging user actions
app.use(addToLog);

//attach simpsons info to the request and carry on to next bit
//a bit like passing props
app.use((req, res, next) => {
  req.simpsons = simpsons;
  next();
});

//route middleware - like an internal "virtual" redirect
app.use("/read", checkToken, require("./routes/read"));
app.use("/delete", checkToken, require("./routes/delete"));
app.use("/create", require("./routes/create"));
app.use("/update", checkToken, require("./routes/update")); //runs with auth middleware
app.use("/login", require("./routes/login"));
app.use("/logout", checkToken, require("./routes/logout"));

//redirect to another page
app.get("/createaccount", (req, res) => {
  res.redirect("/signup");
});

//specify what to listen for (eg "/path")
//and deal with the request (req - simpsons data) by sending a response (res)
//IMPORTANT: The method (post/get etc) has to be right too
app.post("/signup", (req, res) => {
  console.log("the signup data", req.body);
  res.send("Hi from the back end");
});

//define the port to listen on
//(a variable for deployment port as well as hard-code local development)
const port = process.env.PORT || 6001;

//initiate the server to listen
//needs the port to listen on and a callback that occurs when it's listening
app.listen(port, () => {
  console.log("the server is running on ", port);
});
