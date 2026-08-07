import pg from "pg";

const { Pool } = pg;
import env from "dotenv";
env.config();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "LCDataBase",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;