import db from "../config/db.js";
import bcrypt from "bcrypt";

// User Signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || username.length < 3 || username.length > 30) {
    return res
      .status(400)
      .json({ message: "Username must be 3-30 characters long" });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Check if the email already exists
    const existingUser = await db.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await db.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at",
      [username, email, passwordHash]
    );

    res.status(201).json({ message: "User registered", user: result.rows[0] });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Error during signup" });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Find the user by email
    const userResult = await db.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user.user_id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};
