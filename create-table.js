import { sql } from "./db.js";

sql`
    CREATE TABLE Items (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
    );
`.then(() => {
  console.log("tabela criada!");
});
