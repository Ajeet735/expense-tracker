import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '@/configs/schema'; // ✅ Must match your schema file
const sql = neon("postgresql://neondb_owner:npg_k52iPYvKFLAO@ep-snowy-feather-ae9uu1u8.c-2.us-east-2.aws.neon.tech/expense%20tracker?sslmode=require&channel_binding=require"); // ✅ Define sql

export const db = drizzle(sql, { schema }); // ✅ Pass schema
