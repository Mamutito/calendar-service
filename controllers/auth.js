const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwt");

const newUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "The email is already registered",
      });
    }
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(password, salt);
    const newUser = await new User(req.body).save();
    const token = await generateToken(newUser.id, newUser.name);
    res.status(201).json({
      ok: true,
      uid: newUser.id,
      name: newUser.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Please contact the administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }
    const token = await generateToken(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generateToken(uid, name);
  console.log(token);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  newUser,
  loginUser,
  revalidateToken,
};
