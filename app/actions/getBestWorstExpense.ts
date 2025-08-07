'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { records } from '@/configs/schema';
import { eq } from 'drizzle-orm'; // ✅ Import `eq` directly

async function getBestWorstExpense(): Promise<{
  bestExpense?: number;
  worstExpense?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    // ✅ Use correct Drizzle query pattern
    const results = await db
      .select({ amount: records.amount })
      .from(records)
      .where(eq(records.userId, userId));

    if (!results || results.length === 0) {
      return { bestExpense: 0, worstExpense: 0 };
    }

    const amounts: number[] = results.map((record) => record.amount);

    const bestExpense = Math.max(...amounts);
    const worstExpense = Math.min(...amounts);

    return { bestExpense, worstExpense };
  } catch (error) {
    console.error('Error fetching expense amounts:', error);
    return { error: 'Database error' };
  }
}

export default getBestWorstExpense;
