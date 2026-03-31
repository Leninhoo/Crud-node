import { randomUUID } from "node:crypto";
import { sql } from "./models/db.js";

export class DatabasePostgress {
  
  async list(search = "") {
    let items;

    if (search) {
      items =
        await sql`select * from items where title ilike ${"%" + search + "%"}`;
    } else {
      items = await sql`select * from items`;
    }

    return items;
  }

  async create(item) {
    const videoId = randomUUID();
    const { title, description, duration } = item;

    await sql`insert into items (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration} )`;
  }
  async update(id, item) {
    const { title, description, duration } = item;
    await sql`update items set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`;
  }
  async delete(id) {
    await sql`delete from items where id = ${id}`;
  }
}
