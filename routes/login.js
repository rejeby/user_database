const express = require("express");
const router = express.Router();
const { getUniqueID } = require("../utils");

router.post("/", (req, res) => {
  const { body, simpsons } = req;
  let sessionToken = [];

  if (!body.userName || !body.password) {
    res.send({ status: 0, error: "username or password missing" });
  }

  //confirm username & password matches what's on file
  const indexOfUser = simpsons.findIndex((user) => {
    return user.userName === body.userName && user.password === body.password;
  });

  //if details match, generate a token and send it to the user's local storage
  //and keep a copy of the token on the server to compare it with (shared secret)
  if (indexOfUser > -1) {
    const token = getUniqueID(64);
    simpsons[indexOfUser].token = token;

    sessionToken.push(simpsons[indexOfUser]);
    console.log(sessionToken);

    res.send({ status: 1, token });
    return;
  }
  res.send({ status: 0, error: "username and password don't match" });
});

module.exports = router;
