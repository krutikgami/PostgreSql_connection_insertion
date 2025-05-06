import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
})

export const db = {
    query : async (text, params) =>{
        try {
            const res = await pool.query(text, params);
            return res;
        } catch (error) {
            console.log("Database Query Error: ",error);
            throw error;
        }
    }
}


