import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";
import * as schema from "../db/schema"

if (!process.env.DATABASE_URL) {
    console.log('🔴 no database URL');
}

const client = postgres(process.env.DATABASE_URL as string, {max : 10});


const db = drizzle(client, {schema});

export default db;