const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connection = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection;
};

module.exports = { connection };
