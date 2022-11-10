const express = require("express");
const { userDelete } = require("../mysql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  await req.asyncMySQL(userDelete(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;
