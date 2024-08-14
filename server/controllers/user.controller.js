import dbConnection from "../utils/DBUtils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received data:", req.body);

  console.log(username);
  console.log(email);
  console.log(password);

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const db = await dbConnection();

  try {
    const [existingUsers] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (db) {
      db.end();
    }
  }
};

// Existing register function...

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const db = await dbConnection();

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.WEBTOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    res
      .status(200)
      .json({ message: "Logged in successfully", username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (db) db.end();
  }
};

export const authentication = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isLoggedIn: false, success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.WEBTOKEN_KEY);
    res.status(200).json({ isLoggedIn: true, username: decoded.username });
  } catch (error) {
    res.status(401).json({ isLoggedIn: false, success: false });
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};
