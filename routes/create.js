const express = require("express");
const { random } = require("../utils");
const router = express.Router();

router.post("/", (req, res) => {
  const { quote, character, image, characterDirection } = req.body;

  //check we have all the data (can use joi to validate user input on the back end)
  if (quote && character && image && characterDirection) {
    //append a random id
    req.body.id = random(100000000);
    req.simpsons.push(req.body);
    res.send({ status: 1 });
    return;
  }

  res.statusSend(201).send({ status: 0, error: "please provide all the data" });
});

module.exports = router;
