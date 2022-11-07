require("dotenv").config();
console.log(process.env.ISHAPPY);
console.log(__dirname);

//import express from express
const express = require("express");

//create an instance of express. It listens for people trying
//to connect from front end and then it replies
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

//middleware with built-in function
app.use(express.static("public"));

//middleware with built-in function to access json content and convert to object
//it checks that it's json and return the body
app.use(express.json());

//logging user actions
app.use(addToLog);

//custom middleware => next means it runs the middleware and continues on
// app.use((req, res, next) => {
//   console.log("The middleware ran");
//   next();
// });

//need to attach simpsons info to the request and carry on to next bit
//a bit like passing props
app.use((req, res, next) => {
  req.simpsons = simpsons;
  next();
});

//route middleware - this brings in the route (like importing a component)
//this is like an internal redirect that send /vehicle to /vehicle/cars
//like subpages of a subdirectory
app.use("/vehicle", require("./routes/cars"));
app.use("/read", checkToken, require("./routes/read"));
app.use("/delete", checkToken, require("./routes/delete"));
app.use("/create", require("./routes/create"));
app.use("/update", checkToken, require("./routes/update")); //runs with auth middleware
app.use("/login", require("./routes/login"));
app.use("/logout", checkToken, require("./routes/logout"));

//redirect to another page
//There's no content on signup page but URL redirects even though there's no content to get (maybe??)
app.get("/createaccount", (req, res) => {
  res.redirect("/signup");
});

//specify what you want to listen for (eg "/path")
//and deal with the request (req) by sending a response (res)
//IMPORTANT: The method (post/get etc) has to be right too
app.post("/signup", (req, res) => {
  console.log("the signup data", req.body); //this is using the json middleware activated on line 20
  res.send("Hi from the back end");
});

//define the port to listen on
//(a variable for deployment as well as hard-code local development)
const port = process.env.PORT || 6001;

//initiate the server to listen
//needs the port to listen on and a callback that occurs when it's listening
app.listen(port, () => {
  console.log("the server is running on ", port);
});
