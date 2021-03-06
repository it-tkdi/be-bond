const express = require("express");
const authController = require("../controller/auth");
const eventController = require("../controller/event");
const emailController = require("../controller/email");
const groupController = require("../controller/group");
const { authenticateToken } = require("../middleware/jwt");
const upload = require("../middleware/multer");
const app = express.Router();

app.post("/api/auth/admin-login", authController.login);
app.post("/api/auth/change-password", authController.changePassword);
app.get("/api/events", authenticateToken, eventController.getEvents);
app.get("/api/events/client", eventController.getEventsClient);
app.get("/api/events/:id", authenticateToken, eventController.getEvent);
app.get("/api/events/client/:id", eventController.getEventClient);
app.post(
  "/api/events/create",
  upload.single("file"),
  authenticateToken,
  eventController.createEvent
);
app.put(
  "/api/events/edit/:id",
  upload.single("file"),
  authenticateToken,
  eventController.editEvent
);
app.put(
  "/api/events/deactivate/:id",
  authenticateToken,
  eventController.deactivateEvent
);
app.put(
  "/api/events/activate/:id",
  authenticateToken,
  eventController.activateEvent
);

app.post(
  "/api/emails/send-email",
  upload.single("imageFile"),
  authenticateToken,
  emailController.sendEmailToRcps
);
app.get("/api/emails", authenticateToken, emailController.emailList);
app.get("/api/emails/:id", authenticateToken, emailController.getEmail);
app.post("/api/emails/add", authenticateToken, emailController.addEmail);
app.post(
  "/api/emails/add-bulk",
  authenticateToken,
  upload.single("excel_file"),
  emailController.addBulkEmail
);
app.put("/api/emails/edit/:id", authenticateToken, emailController.editEmail);
app.get(
  "/api/emails/deactivate/:id",
  authenticateToken,
  emailController.deactivateEmail
);

app.get("/api/groups", authenticateToken, groupController.groupList);
app.get("/api/groups/:id", authenticateToken, groupController.getGroup);
app.post("/api/groups", authenticateToken, groupController.addGroup);
app.put("/api/groups/edit/:id", authenticateToken, groupController.editGroup);

module.exports = app;
