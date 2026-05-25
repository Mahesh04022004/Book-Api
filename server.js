require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const bookRoutes = require("./routes/book-routes");

const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectToDb();

// middleware
app.use(express.json());

// Routes here
app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
