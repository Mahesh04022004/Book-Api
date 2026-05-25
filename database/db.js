const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@cluster0.xbarwzn.mongodb.net/?appName=Cluster0`,
    );

    console.log("mongodb is connected sucessfully");
  } catch (error) {
    console.error("Mongo DB connection failed ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
