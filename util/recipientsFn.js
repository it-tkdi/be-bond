const db = require("../config/db");

exports.recipientsFn = (groupId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from tb_email where tb_email.group = ?",
      groupId,
      function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
