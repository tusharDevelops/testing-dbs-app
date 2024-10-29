// // Importing the Mongoose library
// const mongoose = require("mongoose");

// // Importing the environment variables using the dotenv library
// require("dotenv").config();

// // Defining a function to connect to the database
// const dbConnect = () => {
// 	// Connecting to the database using the provided URL from the environment variables
// 	mongoose
// 		.connect(process.env.DATABASE_URL, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		})
// 		// If the connection is successful, log a success message
// 		.then(() => console.log("DB CONNECTION SUCCESS"))
// 		// If there are issues connecting to the database, log an error message and exit the process
// 		.catch((err) => {
// 			console.log(`DB CONNECTION ISSUES`);
// 			console.error(err.message);
// 			process.exit(1);
// 		});
// };

// // Exporting the dbConnect function for use in other files
// module.exports = dbConnect;

// config/dbConfig.js
require("dotenv").config();
const { Pool } = require('pg');

// Create a new Pool instance with the connection string from the environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Optional: You can configure additional options if needed
    ssl: {
        rejectUnauthorized: false, // Use this if you're using a self-signed certificate or if SSL is required by Neon
    },
});

const setupDatabase = async () => {
    const client = await pool.connect();
    try {
        // Create users table if it doesn't exist
        await client.query(`
         CREATE TABLE users (
        id SERIAL PRIMARY KEY,         -- Automatically incrementing ID for each user
        name VARCHAR NOT NULL,         -- User's name, cannot be NULL
        email VARCHAR NOT NULL UNIQUE, -- User's email, cannot be NULL and must be unique
        title VARCHAR NOT NULL,        -- User's title, cannot be NULL
        department VARCHAR NOT NULL,   -- User's department, cannot be NULL
        role VARCHAR NOT NULL,         -- User's role, cannot be NULL
        image VARCHAR NOT NULL         -- URL or path to user's image, cannot be NULL
        );
        `);
        console.log("Users table created or already exists.");
    } catch (error) {
        console.error("Error creating users table:", error);
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Export the pool to use in your models and controllers
module.exports = {pool,setupDatabase};

