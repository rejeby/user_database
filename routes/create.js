const express = require("express");
const { createUser } = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  //test route is connected:
  // const results = await req.asyncMySQL("SELECT * FROM users;");
  // console.log("hello from Create", results);

  let { name, email, password } = req.body;

  //check we have all the data (can use joi to validate user input on the back end)
  if (name && email && password) {
    password = sha256(process.env.SALT + password);
    const result = await req.asyncMySQL(createUser(name, email, password));

    console.log(result);

    //validate entry
    if (result.affectedRows === 1) {
      //everything okay, one row was was affected
      res.send({ status: 1 });
    } else {
      res.send({ status: 0, error: "ERROR: Entry not created" });
    }

    return;
  }

  res.statusSend(201).send({ status: 0, error: "please provide all the data" });
});

module.exports = router;
