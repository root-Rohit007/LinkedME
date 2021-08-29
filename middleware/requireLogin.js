const jwt = require("jsonwebtoken");
const { JWTSEC } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // From headers
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "Log in please" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWTSEC, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    // verified
    const { _id } = payload; // Find user id
    //Get user
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
