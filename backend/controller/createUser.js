// const User = require("../models/User");

// exports.createUser = async (req, res) => {
//   try {
//     console.log("req body", req.body);
//     const { name, email, title, department, role } = req.body;
//     if (!name || !email || !title || !role || !department) {
//       console.log("not all fields...");
//       return res.status(400).json({
//         status: 400,
//         message: "Please fill all fields",
//       });
//     }
//     const user = await User.create({
//       name,
//       email,
//       title,
//       department,
//       role,
//       image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
//     });
//     return res.status(200).json({
//       status: 201,
//       message: "User created successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({
//       status: 500,
//       message: error.message,
//     });
//   }
// };

const {pool} = require("../config/database"); // Import the database pool

exports.createUser = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { name, email, title, department, role } = req.body;

    // Validate the input fields
    if (!name || !email || !title || !role || !department) {
      console.log("not all fields...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    // SQL query to insert a new user
    const query = `
      INSERT INTO users (name, email, title, department, role, image) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;`; // Returning the created user

    const values = [
      name,
      email,
      title,
      department,
      role,
      `https://api.dicebear.com/5.x/initials/svg?seed=${name}`, // Generate image URL
    ];

    // Execute the query
    const result = await pool.query(query, values);
    const user = result.rows[0]; // Get the created user

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
