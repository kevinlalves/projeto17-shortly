import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
  ssl: process.env.NODE_ENV === 'production',
});

export default db;
