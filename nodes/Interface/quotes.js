const db = require("../db/index");
const quotes = (req, res) => {
  const sql =
    "SELECT * FROM `quotes` WHERE id >= FLOOR(RAND() * (SELECT MAX(id) FROM `quotes`)) ORDER BY id LIMIT 1;";
  db.query(sql, (err, results) => {
    if (err) {
      return console.log("err:" + err.message);
    }
    const obj = results[0];
    res.send(obj);
  });
};
module.exports = quotes;
