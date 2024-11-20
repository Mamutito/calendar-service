const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { jwtValidator } = require("../middlewares/jwt-validator");

router.use(jwtValidator);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").isISO8601(),
    check("end", "End date is required").isISO8601(),
    fieldValidator,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
