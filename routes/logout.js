const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  //kill the token
  delete req.currentUser.token;

  res.send({
    status: 1,
    token: req.currentUser.token,
    message: "user logged out",
  });
  return;
});

module.exports = router;
