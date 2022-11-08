console.log("Hello world");

const mysql = require("mysql"); //driver

//connect node code and sql server
const connection = mysql.createConnection({
  port: 3306,
  database: "russell_db",
  user: "root",
  password: "",
  host: "localhost",
});

//initiate connection
connection.connect();

//load connection results as a promise
function asyncMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.log(
          "Connection to server failed, check server is running",
          error
        );
        reject("my SQL said no");
      }
      resolve(results);
    });
  });
}

// async function test() {
//   const results = await asyncMySQL(`SELECT * FROM users;`);
//   console.log(results);
// }

// test();

module.exports = asyncMySQL;
