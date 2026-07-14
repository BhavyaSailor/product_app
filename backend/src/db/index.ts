import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { ENV } from "../config/env";
import * as schema from "./schema";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not set in environment Variable");   
}

const pool = new Pool({connectionString: ENV.DATABASE_URL});

pool.on("connect", () => {
    console.log("database connected successfully");
})

pool.on("error", (err) => {
    console.error("Connection Failed", err);
})

export const db = drizzle({client: pool, schema});
