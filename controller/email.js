const express = require("express");
const db = require("../config/db");
const { importToDB } = require("../util/import2db");
const path = require("path");
const { sendEmail } = require("../util/node-mailer");

class emailController {
  static async emailList(req, res) {
    try {
      const sqlEmailList = db.query(
        "select tb_email.*, tb_group.group_name from tb_email inner join tb_group on tb_email.group = tb_group.id where is_active = 1",
        function (err, rows) {
          if (rows.length > 0) {
            res.json({
              statusCode: 200,
              message: "success retrieve email list.",
              data: rows,
            });
          } else {
            res.json({
              statusCode: 404,
              message: "no data.",
            });
            console.log("404 no data.");
          }
        }
      );
    } catch (error) {
      res.json({
        statusCode: 500,
        message: error,
      });
      console.log("500 " + error);
    }
  }

  static async getEmail(req, res) {
    try {
      const { id } = req.params;

      const sqlGetEmailById = db.query(
        "select * from tb_email where id = ? and is_active = 1",
        [id],
        function (err, row) {
          if (row) {
            res.json({
              statusCode: 200,
              message: "success retrieve email data.",
              data: row[0],
            });
            console.log("200 success retrieve email data.");
          } else {
            res.json({
              statusCode: 404,
              message: "email not found.",
            });
            console.log("404 email not found.");
          }
        }
      );
    } catch (error) {
      res.json({
        statusCode: 500,
        message: error,
      });
      console.log("500 " + error);
    }
  }

  static async addEmail(req, res) {
    try {
      const { name, email, groupId } = req.body;
      if (req.body) {
        const sqlAddEmail = db.query(
          "insert into tb_email (name, email, `group`) values (?,?,?)",
          [name, email, groupId],
          function (err, row) {
            if (row) {
              res.json({
                statusCode: 200,
                message: "success add email.",
                data: row[0],
              });
              console.log("200 success add email.");
            } else {
              res.json({
                statusCode: 500,
                message: err,
              });
              console.log("500 " + err);
            }
          }
        );
      } else {
        res.json({
          statusCode: 400,
          message: "please fill in the form.",
        });
        console.log("400 please fill in the form.");
      }
    } catch (error) {
      res.json({
        statusCode: 500,
        message: error,
      });
      console.log("500 " + error);
    }
  }

  static async addBulkEmail(req, res) {
    try {
      const excel_file = req.file;
      await importToDB(
        path.join(process.cwd(), "/upload/", excel_file.filename)
      );

      res.json({
        statusCode: 200,
        message: "success import data.",
      });
      console.log("200 success import data.");
    } catch (error) {
      res.json({
        statusCode: 500,
        message: error,
      });
      console.log("500 " + error);
    }
  }

  static async editEmail(req, res) {
    try {
      const { id } = req.params;
      const { name, email, group } = req.body;
      const sqlEditEmail = db.query(
        "update tb_email set name = ?, email = ?, `group` = ? where id = ?",
        [name, email, group, id],
        function (err, row) {
          if (row) {
            res.json({
              statusCode: 201,
              message: "success edit email.",
            });
            console.log("201 success edit email.");
          } else {
            res.json({
              statusCode: 500,
              message: err,
            });
            console.log("500 " + err);
          }
        }
      );
    } catch (error) {
      res.json({
        statusCode: 500,
        message: err,
      });
      console.log("500 " + err);
    }
  }

  static async deactivateEmail(req, res) {
    try {
      const { id } = req.params;

      const sqlDeactivateEmail = db.query(
        "update tb_email set is_active = 0 where id = ?",
        [id],
        function (err, row) {
          if (row) {
            res.json({
              statusCode: 201,
              message: "201 success deactivate email.",
            });
            console.log("201 success deactivate email.");
          } else {
            res.json({
              statusCode: 500,
              message: "500 " + err,
            });
            console.log("500 " + err);
          }
        }
      );
    } catch (error) {
      res.json({
        statusCode: 500,
        message: "500 " + error,
      });
    }
  }

  static async sendEmailToRcps(req, res) {
    try {
      const { subject, body, to } = req.body;
      const imageFile = req.file;
      let toArr = to.split(",");

      let recipients = [];
      if (toArr[0].includes("@") == false) {
        for (let i = 0; i < toArr.length; i++) {
          let sql = db.query(
            "select * from tb_email where tb_email.group = ?",
            [toArr[i]],
            function (err, rows) {
              for (let j = 0; j < rows.length; j++) {
                // console.log(rows[j].email);
                recipients.push(rows[j].email);
              }
              // console.log(recipients);
              // return recipients
              toArr = recipients
              const emailData = { subject, body, toArr };
              sendEmail(emailData, imageFile);
              res.json({
                emailData,
                imageFile,
              });
            }
          );
        }
      } else {
        const emailData = { subject, body, toArr };
        if (emailData && imageFile) {
          sendEmail(emailData, imageFile);
          res.json({
            emailData,
            imageFile,
          });
          // console.log(emailData);
          // console.log(imageFile);
        } else {
          console.log("request not complete.");
          // console.log(emailData);
          // console.log(imageFile);
        }
      }
    } catch (error) {
      console.log("500 " + error);
    }
  }
}

module.exports = emailController;
