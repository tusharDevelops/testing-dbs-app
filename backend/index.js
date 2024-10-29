// const express = require("express");
// require("dotenv").config();
// const dbConnect = require("./config/database");
// const userRoutes = require("./routes/user");
// const app = express();
// var cors = require("cors");
// const PORT = process.env.PORT || 4000;

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// // Middleware
// app.use(express.json());

// app.use("/api/v1", userRoutes);

// // CORS Configuration
// app.listen(PORT, () => {
//   console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
// });

// dbConnect();

// app.get("/", (req, res) => {
//   res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
// });


const express = require("express");
require("dotenv").config();
const { setupDatabase } = require("./config/database"); // Import setupDatabase
const userRoutes = require("./routes/user");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors({ origin: "*" }));

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/v1", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("<h1>Backend is Running and this is '/' Route</h1>");
});

// Start the server after setting up the database
app.listen(PORT, async () => {
  await setupDatabase(); // Call setupDatabase to create tables if they don’t exist
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

module.exports = app;
