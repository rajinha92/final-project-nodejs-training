module.exports = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") throw new Error();
  } catch (e) {
    return res.status(403).send("Unauthorized");
  }

  next();
};
