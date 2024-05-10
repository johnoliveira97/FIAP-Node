import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


async function openDb () {
    return open({
        filename: path.join(process.cwd(), 'database.db'),
        driver: sqlite3.Database
    })
}

export async function loadTask() {
    const db = await openDb();
    const data = await db.all('SELECT * FROM tasks');

    return data;
    /*return [
        {id: 1, title: "Task 01"},
        {id: 2, title: "Task 02"} 
    ];*/
}