// const User = require("../models/User");
// exports.getUser = async (req, res) => {
// 	try {
// 		const userData = await User.find({});
// 		res.json({ success: true, data: userData });
// 	} catch (error) {
// 		res.status(500).json({ success: false, error: error });
// 	}
// };

const {pool} = require("../config/database"); // Import the database pool

exports.getUser = async (req, res) => {
  try {
    // Query to select all users from the "users" table
    const result = await pool.query("SELECT * FROM users;");
    
    // Access all user rows
    const userData = result.rows;
    
    // Send the retrieved user data as JSON
    res.json({ success: true, data: userData });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
