const { validationResult } = require("express-validator");
const { response } = require("express");
const fieldValidator = (req, res = response, next) => {
  const validation = validationResult(req);

  if (validation.errors.length > 0) {
    return res.status(400).json({
      ok: false,
      errors: validation.mapped(),
    });
  }

  next();
};

module.exports = {
  fieldValidator,
};
