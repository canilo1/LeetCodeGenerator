import pool from "../DatabaseConnection.js";
console.log(pool, "✅ pool loaded");
import { createHash } from "crypto";

function hashPassword(password) {
  return createHash("sha256")
    .update(password)
    .digest("hex");
}

export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
        console.log(typeof username, typeof password, "✅ Received username and password");
    await pool.query(
      `INSERT INTO users (username, passwordhash)
       VALUES ($1,$2)`,
      [username, hashPassword(password)]
    );

    res.status(201).json({
      user: {
        username,
      },
    });

  } catch (err) {
    next(err);
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    const user = result.rows[0];

    if (user.passwordhash !== hashPassword(password)) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    res.json({
      user: {
        username: user.username,
      },
    });

  } catch (err) {
    next(err);
  }
};

