'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { records } from '@/configs/schema';
import { eq } from 'drizzle-orm';

async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const results = await db
      .select()
      .from(records)
      .where(eq(records.userId, userId));

    // Total amount
    const record = results.reduce((sum: number, rec) => sum + rec.amount, 0);

    // Count of days with amount > 0
    const daysWithRecords = results.filter((rec) => rec.amount > 0).length;

    return { record, daysWithRecords };
  } catch (error) {
    console.error('Error fetching user record:', error);
    return { error: 'Database error' };
  }
}

export default getUserRecord;
