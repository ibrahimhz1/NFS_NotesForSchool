const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(`${process.env.DB_URI}`)
    .then((data) => {
      console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
