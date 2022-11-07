const express = require("express");
const router = express.Router(); //just need router part of express

router.get("/car", () => {
  console.log("hi from car");
});

router.get("/bus", () => {
  console.log("hi from bus");
});

module.exports = router;
