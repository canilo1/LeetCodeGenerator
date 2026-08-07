// Only run this once to create the tables

import pool from "./DatabaseConnection.js";
import { createUsersTable, createNotesTable } from "./userSchema.js";

await pool.query(createUsersTable);
await pool.query(createNotesTable);

console.log("Database setup complete!");
await pool.end();