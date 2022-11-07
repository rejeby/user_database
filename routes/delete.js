const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  // const idAsNumber = Number(req.params.id);

  //check a valid ID number was entered
  // if (!idAsNumber) {
  //   res.send({ status: 0, error: "item ID not set" });
  //   return;
  // }

  const indexOfItem = req.simpsons.findIndex((item) => {
    return item.id == req.currentUser.id;
  });

  req.simpsons.splice(indexOfItem, 1);
  res.send({ status: 1 });
});

module.exports = router;
