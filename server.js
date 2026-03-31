import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";
import { DatabasePostgress } from "./database-postgres.js";
import userSchema from "./models/userSchema.js";

const server = fastify();

//const database = new DataBaseMemory();
const database = new DatabasePostgress();

server.post("/items", async (request, reply) => {
  const { title, description, duration } = request.body;
  const { error } = userSchema.validate(request.body);
  if (error) return reply.status(422).send({ error});

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send({ message: "Item created successfully" });
});

server.get("/items", async (request) => {
  const query = request.query.search;
  console.log(query);
  const items = await database.list(query);
  return items;
});

server.put("/items/:id", (request, reply) => {
  const itemId = request.params.id;
  const { title, description, duration } = request.body;

  const item = database.update(itemId, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});

server.delete("/items/:id", (request, reply) => {
  const itemId = request.params.id;
  database.delete(itemId);
  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
