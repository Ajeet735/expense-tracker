'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { eq, desc } from 'drizzle-orm'; // ✅ Import these
import { records } from '@/configs/schema'; // ✅ Adjust path to your records schema if needed
import { Record } from '@/types/Record';

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const result = await db
      .select()
      .from(records)
      .where(eq(records.userId, userId))
      .orderBy(desc(records.date))
      .limit(10);

    return { records: result };
  } catch (error) {
    console.error('Error fetching records:', error);
    return { error: 'Database error' };
  }
}

export default getRecords;
