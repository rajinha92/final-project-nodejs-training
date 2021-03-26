const User = require("./../models/user");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports = {
  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      if (!username || !password || !role)
        return res.status(400).send("username, password and role are required");
      const userExists =
        (await User.countDocuments({
          username,
        })) > 0;

      if (userExists) return res.status(400).send("User already exists");

      const user = new User({
        username,
        password: await bcrypt.hash(password, SALT_ROUNDS),
        role,
      });

      await user.save();

      const token = user.jwtSign();

      return res.header("x-auth-token", token).send(token);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  },
  async auth(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).send("username and password are required");
      const user = await User.findOne({
        username,
      });
      if (!user) return res.status(400).send("Username or password invalid");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).send("username and password are required");

      const token = user.jwtSign();
      console.log(user, token);

      return res.header("x-auth-token", token).send(token);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e.message);
    }
  },
};
