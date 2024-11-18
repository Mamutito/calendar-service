const express = require("express");
const router = express.Router();
const { loginUser, newUser, revalidateToken } = require("../controllers/auth");

const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldValidator,
  ],
  loginUser
);

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  newUser
);

router.get("/renew", jwtValidator, revalidateToken);

module.exports = router;
