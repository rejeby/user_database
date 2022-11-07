const express = require("express");
const router = express.Router(); //just need router part of express

router.get("/", (req, res) => {
  //commenting out ability to search/read all data
  // let { count, search } = req.query;

  // count = Number(count);
  // //make a copy of the data so queries are performed here
  // //simpsons data is part of the request coming from middleware in index.js
  // const _simpsons = [...req.simpsons];
  // console.log(req); //req contains data we can use e.g query, params...

  // //use query to determine number of items to return
  // //if there's a valid count, it'll return that number, otherwise it skips
  // //this bit and returns the lot
  // if (
  //   count &&
  //   count > 0 &&
  //   typeof count === "number" &&
  //   count <= _simpsons.length
  // ) {
  //   _simpsons.length = count;
  // }

  // //filter results if there's a search coming in
  // // make a copy that holds any requested "count"
  // let filtered = _simpsons;
  // if (search) {
  //   filtered = filtered.filter((item) => {
  //     return item.character.toLowerCase().includes(search);
  //   });

  // }

  //   res.send("Hello from the back end");
  //return the data

  // res.status(200).send(filtered);

  res.send(req.currentUser);
});

module.exports = router;
