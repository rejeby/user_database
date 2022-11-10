checkDBStatus = async (asyncMySQL) => {
  try {
    const results = await asyncMySQL("SHOW TABLES;");
    // console.log(results);
    if (results.length < 2) console.log("Database has missing tables!");
  } catch (error) {
    console.log("mySQL Error", error);
  }
};

module.exports = checkDBStatus;
