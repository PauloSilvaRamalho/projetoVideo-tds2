import fastify from "fastify";
import { DatabasePostgres } from "./databasePostgres.js";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import {dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const server = fastify();

//serve arquivos estáticos da pasta 'public'
await server.register(fastifyStatic, {
    root: join(__dirname, "public"),
    prefix: "/", //para acessar os arquivos
});

//configurar CORS

await server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

const database = new DatabasePostgres();

// Rotas 
server.post("/videos", async(request, reply) =>{
    const {title, description, duration} = request.body;

    await database.create({title, description, duration});
    return reply.status(201).send();
});

server.get("/videos", async(request, reply) => {
    const search = request.query.search;
    const videos = await database.list(search);
    return videos; //sempre retorna array;
});

server.put("/video/:id", async(request, reply) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    await database.update(videoId, {title, description, duration});

    return reply.status(204).send();
});

server.delete("/videos/:id", async(request, reply) => {
    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333,
}).then(() => console.log("Servidor rodando em http://localhost:3333"));