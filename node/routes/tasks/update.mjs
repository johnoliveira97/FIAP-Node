import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb () {
    return open({
        filename: path.join(process.cwd(), 'database.db'),
        driver: sqlite3.Database
    })
}

export async function updateTask(taskId, updatedData) {
    const db = await openDb();

    try {
        await db.run('UPDATE tasks SET completed = ? WHERE id = ?', 
                    [updatedData.status, taskId]);

        await db.close();
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        throw new Error('Erro ao atualizar tarefa');
    }
}