import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://neondb_owner:npg_k52iPYvKFLAO@ep-snowy-feather-ae9uu1u8.c-2.us-east-2.aws.neon.tech/expense%20tracker?sslmode=require&channel_binding=require",
  },
});
