const express = require("express");
const router = express.Router(); //just need router part of express
const { getUser } = require("../mysql/queries");

router.get("/", async (req, res) => {
  const results = await req.asyncMySQL(getUser(req.headers.token));

  if (results.length === 0) {
    res.send({ status: 0, error: "ERROR: User not found" });
    return;
  }
  res.send({ status: 1, result: results[0] });
});

module.exports = router;
