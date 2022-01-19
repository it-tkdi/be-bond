const express = require("express");
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

class eventController {
  static async getEvents(req, res) {
    try {
      const sqlGetEvents = db.query(
        "select *, tb_event_image.filename, tb_event_image.base64string from tb_event inner join tb_event_image on tb_event.id = tb_event_image.event_id",
        async function (err, rows) {
          if (rows.length > 0) {
            res.json({
              statusCode: 200,
              message: "success retrieve events.",
              data: rows,
            });
            console.log("200 success retrieve events.");
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

  static async getEvent(req, res) {
    try {
      const { id } = req.params;
      const sqlGetEvent = db.query(
        "select *, tb_event_image.filename, tb_event_image.base64string from tb_event inner join tb_event_image on tb_event.id = tb_event_image.event_id where tb_event.id = ?",
        [id],
        async function (err, row) {
          if (row) {
            res.json({
              statusCode: 200,
              message: "success retrieve event data.",
              data: row[0],
            });
            console.log("200 success retrieve event data.");
          } else {
            res.json({
              statusCode: 404,
              message: "data not found.",
            });
            console.log("404 data not found.");
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

  static async createEvent(req, res) {
    try {
      const createdAt = new Date();
      const { event_name, event_date, description, event_time } = req.body;
      const file = req.file;

      // function to encode file data to base64 encoded string
      function base64_encode(data) {
        // read binary data
        var bitmap = fs.readFileSync(data);
        // convert binary data to base64 encoded string
        const convertToBase64 = bitmap.toString("base64");

        // fs.writeFile('base64image.txt', convertToBase64, function (err) {
        //     if (err) return console.log(err);
        //     console.log('file created.');
        // })
        return convertToBase64;
      }
      const base64str = base64_encode(path.join(process.cwd(), `${file.path}`));
      // console.log(createdAt.toISOString().slice(0,10));

      if (req.body && file) {
        const sqlInsertEvent = db.query(
          "insert into tb_event (event_name, event_date, description, created_by, created_at, event_time) values (?,?,?,?,?,?)",
          [
            event_name,
            event_date,
            description,
            "admin@bond.com",
            createdAt.toISOString().slice(0, 10),
            event_time,
          ],
          function (err, row) {
            if (row) {
              const sqlInsertEventImage = db.query(
                'insert into tb_event_image (event_id, filename, created_by, created_at, base64string) values (?,?,"admin@bond.com",?,?)',
                [row.insertId, file.filename, createdAt, base64str],
                function (err, row) {
                  if (row) {
                    res.json({
                      statusCode: 200,
                      message: "success create event.",
                      data: row[0],
                    });
                    console.log("200 success create event.");
                    // console.log(row);
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
                statusCode: 500,
                message: "failed to create the event.",
              });
              console.log("500 failed to create the event.");
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

  static async editEvent(req, res) {
    try {
      const updatedAt = new Date();
      const { id } = req.params;
      const { event_name, event_date, description, event_time } = req.body;
      const file = req.file;

      // function to encode file data to base64 encoded string
      function base64_encode(data) {
        // read binary data
        var bitmap = fs.readFileSync(data);
        // convert binary data to base64 encoded string
        const convertToBase64 = bitmap.toString("base64");

        // fs.writeFile('base64image.txt', convertToBase64, function (err) {
        //     if (err) return console.log(err);
        //     console.log('file created.');
        // })
        return convertToBase64;
      }
      const base64str = base64_encode(path.join(process.cwd(), `${file.path}`));

      if (req.body) {
        const sqlUpdateEvent = db.query(
          "update tb_event set event_name = ?, event_date = ?, description = ?, event_time = ? where id = ?",
          [event_name, event_date, description, event_time, id],
          async function (err, row) {
            if (row) {
              if (!file) {
                res.json({
                  statusCode: 201,
                  message: "success update events.",
                });
                console.log("201 success update events.");
              } else {
                const sqlUpdateEventImage = db.query(
                  "update tb_event_image set filename = ?, base64string = ? where id = ?",
                  [file.filename, base64str, id],
                  function (err, row) {
                    if (row) {
                      res.json({
                        statusCode: 201,
                        message: "success update events.",
                      });
                      console.log("201 success update events.");
                    } else {
                      res.json({
                        statusCode: 500,
                        message: "failed to update the event.",
                      });
                      console.log("500 failed to update the event.");
                    }
                  }
                );
              }
            } else {
              res.json({
                statusCode: 500,
                message: "failed to update the event.",
              });
              console.log("500 failed to update the event.");
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

  static async deactivateEvent(req, res) {
    try {
      const { id } = req.params;

      const sqlFindEvent = db.query(
        "select * from tb_event where id = ?",
        [id],
        function (err, row) {
          if (row) {
            const sqlDeactivateEvent = db.query(
              "update tb_event set is_active = 0 where id = ?",
              [id],
              async function (err, row) {
                if (row) {
                  res.json({
                    statusCode: 201,
                    message: "success deactivate event.",
                  });
                  console.log("201 success deactivate event.");
                } else {
                  res.json({
                    statusCode: 500,
                    message: "failed to deactivate event.",
                  });
                  console.log("500 failed to deactivate event.");
                }
              }
            );
          } else {
            res.json({
              statusCode: 404,
              message: "data not found.",
            });
            console.log("404 data not found.");
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

  static async activateEvent(req, res) {
    try {
      const { id } = req.params;

      const sqlFindEvent = db.query(
        "select * from tb_event where id = ?",
        [id],
        function (err, row) {
          if (row) {
            const sqlDeactivateEvent = db.query(
              "update tb_event set is_active = 1 where id = ?",
              [id],
              async function (err, row) {
                if (row) {
                  res.json({
                    statusCode: 201,
                    message: "success activate event.",
                  });
                  console.log("201 success activate event.");
                } else {
                  res.json({
                    statusCode: 500,
                    message: "failed to activate event.",
                  });
                  console.log("500 failed to activate event.");
                }
              }
            );
          } else {
            res.json({
              statusCode: 404,
              message: "data not found.",
            });
            console.log("404 data not found.");
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

  static async getEventsClient(req, res) {
    try {
      const sqlGetEventsClient = db.query(
        "select *, tb_event_image.filename, tb_event_image.base64string from tb_event inner join tb_event_image on tb_event.id = tb_event_image.event_id where is_active = 1",
        function (err, rows) {
          if (rows) {
            res.json({
              statusCode: 200,
              message: "success retrieve email list.",
              data: rows,
            });
            console.log("200 success retrieve email list.");
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

  static async getEventClient(req, res) {
    try {
      const { id } = req.params;
      const sqlGetEventClient = db.query(
        "select *, tb_event_image.filename, tb_event_image.base64string from tb_event inner join tb_event_image on tb_event.id = tb_event_image.event_id where is_active = 1 and tb_event.id = ?",
        [id],
        function (err, row) {
          if (row.length > 0) {
            res.json({
              statusCode: 200,
              message: "success retrieve email data.",
              data: row[0],
            });
            console.log("200 success retrieve email data.");
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
}

module.exports = eventController;
