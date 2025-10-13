import fastify from "fastify";
import { DatabasePostgres } from "./databasePostgrease.js";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { fileUrlToPath } from "url";
import {dirname, join} from "path";

