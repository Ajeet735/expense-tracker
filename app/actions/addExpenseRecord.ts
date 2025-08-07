'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { records } from '@/configs/schema';
import { v4 as uuidv4 } from 'uuid'; // install this if not already installed

interface RecordData {
  text: string;
  amount: number;
  category: string;
  date: string;
}

interface RecordResult {
  data?: RecordData;
  error?: string;
}

async function addExpenseRecord(formData: FormData): Promise<RecordResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');
  const categoryValue = formData.get('category');
  const dateValue = formData.get('date');

  if (
    !textValue || textValue === '' ||
    !amountValue ||
    !categoryValue || categoryValue === '' ||
    !dateValue || dateValue === ''
  ) {
    return { error: 'Text, amount, category, or date is missing' };
  }

  const text = textValue.toString();
  const amount = parseFloat(amountValue.toString());
  const category = categoryValue.toString();

  let date: string;
  try {
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split('-');
    const dateObj = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
    );
    date = dateObj.toISOString();
  } catch (error) {
    console.error('Invalid date format:', error);
    return { error: 'Invalid date format' };
  }

  const { userId } = await auth();
  if (!userId) return { error: 'User not found' };

  try {
    const createdRecord = await db
      .insert(records)
      .values({
        id: uuidv4(), // Add the ID if it's required
        text,
        amount,
        category,
        date: new Date(date),
        userId,
      })
      .returning()
      .then((res) => res[0]);

    const recordData: RecordData = {
      text: createdRecord.text,
      amount: createdRecord.amount,
      category: createdRecord.category,
      date: createdRecord.date.toISOString(),
    };

    revalidatePath('/');
    return { data: recordData };
  } catch (error) {
    console.error('Error adding expense record:', error);
    return {
      error: 'An unexpected error occurred while adding the expense record.',
    };
  }
}

export default addExpenseRecord;
