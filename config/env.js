import { config } from "dotenv";
import process from 'node:process';

config({ path: '.env' });

export const { 
    PORT,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
} = process.env;