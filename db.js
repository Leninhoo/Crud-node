import postgres from 'postgres'

//const http = require("http");
//const { neon } = require("@neondatabase/serverless");
//const sql = neon(process.env.DATABASE_URL);

export const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
