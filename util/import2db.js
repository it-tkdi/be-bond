const res = require("express/lib/response");
const readXlsxFile = require("read-excel-file/node");
const db = require("../config/db");
const { array } = require("../middleware/multer");

exports.importToDB = async (filepath) => {
  readXlsxFile(filepath)
    .then((rows) => {
      // console.log(rows);
      rows.shift();
      let arrayResult = [];
      for (let i = 0; i < rows.length; i++) {
        let name = rows[i][0];
        let email = rows[i][1];
        let group = rows[i][2];
        // console.log(email);

        db.query(
          "select * from tb_email where email = ?",
          [email],
          function (err, row) {
            if (row.length > 0) {
              arrayResult.push(`${email} already exist.`);
              return true;
            } else {
              db.query(
                "insert into tb_email (name, email, `group`) values (?,?,?)",
                [name, email, group],
                function (err, row) {
                  if (row) {
                    arrayResult.push(`${email} added.`);
                  } else {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      }
    })
    .catch(() => {});
};
