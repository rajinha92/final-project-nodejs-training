const jwt = require("jsonwebtoken");
const User = require("./../models/user");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) throw new Error("JWT token is invalid");

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { _id, username, role } = await User.findById(decoded._id);
    req.user = { _id, username, role };
  } catch (e) {
    console.error(e);
    return res.status(401).send("Unauthenticated");
  }

  next();
};
