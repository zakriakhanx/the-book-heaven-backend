import { config } from "dotenv";
import process from 'node:process';

config({ path: '.env' });

export const { 
    PORT,
    DB_URI,
} = process.env;