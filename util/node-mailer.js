const nodemailer = require("nodemailer");
const { emailTemplate } = require("../util/email-template");
const db = require("../config/db");

exports.sendEmail = async (emailData, imageFile) => {
  const transporter = nodemailer.createTransport({
    host: "srv99.niagahoster.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const recipients = emailData.toArr;
  recipients.forEach(async function (toArr, i, recipients) {
    db.query(
      "select * from tb_email where email = ?",
      [recipients[i]],
      async function (err, row) {
        if (row) {
          let msg = {
            from: process.env.EMAIL_ADDRESS, // sender address
            subject: emailData.subject, // Subject line
            html: emailTemplate.newsLetter(
              recipients[i],
              row[0].name,
              emailData,
              imageFile
            ), // html body
          };
          msg.to = toArr;
          await transporter.sendMail(msg);
          console.log("email sent to " + recipients[i]);
        }
      }
    );
  });
};
