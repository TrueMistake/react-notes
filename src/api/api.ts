import {db} from "../db/db";
import {AddInterface} from "../interface/add.interface";
import {timeInMilliseconds} from "../helper/date";

export async function addNotes(item:AddInterface): Promise<void> {
  try {
    await db?.table('notes')?.add({
      name: item.name,
      description: item.description,
      content: item.content,
      date: timeInMilliseconds(item.date)
    });
  } catch (error) {
    console.log('error',error)
  }
}

export async function updateNotes(id: number, text: string): Promise<void> {
  try {
    await db?.table('notes')?.update(id, {content: text});
  } catch (error) {
    console.log('error',error)
  }
}

export async function removeNotes(id: number): Promise<void> {
  try {
    await db.table('notes')?.delete(id);
  } catch (error) {
    console.log('error',error)
  }
}
