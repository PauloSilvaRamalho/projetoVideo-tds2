import {neon} from '@neondatabase/serverless';
import 'dotenv/config';

export const sql = neon(process.env.DATABASE_URL)

//DATABASE_URL='postgresql://neondb_owner:npg_uFtHc8bnKZT7@ep-delicate-math-acaghsu4-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'