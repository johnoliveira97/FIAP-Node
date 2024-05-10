import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb () {
    return open({
        filename: path.join(process.cwd(), 'database.db'),
        driver: sqlite3.Database
    })
}

export async function createTask(payload) {
    const { title, dueDate, status } = payload;

    try {
        const db = await openDb();
        await db.run('INSERT INTO tasks (title, completed_at, completed) VALUES (?, ?, ?)', [title, dueDate, status]);
        await db.close();
    } catch {
        console.error('Erro ao criar tarefa:', error);
        throw new Error('Erro ao criar tarefa');
    }

}