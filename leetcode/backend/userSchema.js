import pool from "./DatabaseConnection.js";

await pool.query(`
  ALTER TABLE users
  ADD COLUMN passwordHash VARCHAR(255);
`);

console.log("passwordHash column added!");
await pool.end();