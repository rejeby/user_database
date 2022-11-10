const express = require("express");
const { userCheckCreds, userAddToken } = require("../mysql/queries");
const router = express.Router();
const { getUniqueID } = require("../utils");
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0, error: "email or password missing" });
  }

  //confirm username & password matches what's on file
  password = sha256(process.env.SALT + password);

  const results = await req.asyncMySQL(userCheckCreds(email, password));

  if (results.length === 0) {
    res.send({ status: 0, error: "Incorrect email or password" });
    return;
  }

  const token = getUniqueID(64);

  await req.asyncMySQL(userAddToken(results[0].id, token));

  res.send({ status: 1, token });
});

module.exports = router;
