import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const useConnectionString = Boolean(process.env.DATABASE_URL);

export const pool = new Pool(
  useConnectionString
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.DATABASE_SSL === "false"
            ? false
            : { rejectUnauthorized: false },
      }
    : {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT || 5432),
      }
);
