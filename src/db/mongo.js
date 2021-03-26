const mongoose = require("mongoose");

class Mongo {
  connect() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  connection() {
    return mongoose.connection;
  }
}

module.exports = new Mongo();
