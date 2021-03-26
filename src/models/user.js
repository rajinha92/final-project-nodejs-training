const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

userSchema.methods.jwtSign = function () {
  const { _id, username, role } = this;
  return jwt.sign(
    {
      _id,
      username,
      role,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
