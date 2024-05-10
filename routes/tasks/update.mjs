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
        const currentTask = await getTaskById(taskId);
        const isDifferent = isDifferentValues(currentTask, updatedData);

        if (!isDifferent) {
            await db.close();
            return 'Os valores recebidos são iguais aos valores atuais. Nenhuma alteração foi feita.';
        }
        await db.run('UPDATE tasks SET title = ?, completed_at = ?, completed = ? WHERE id = ?', 
                    [updatedData.title, updatedData.dueDate, updatedData.status, taskId]);
        await db.close();
        return 'Tarefa editada com sucesso.';
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        throw new Error('Erro ao atualizar tarefa');
    }
}

export async function getTaskById(taskId) {
    try {
        const db = await openDb();

        const task = await db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);

        await db.close();

        return task;
    } catch (error) {
        console.error('Erro ao recuperar tarefa pelo ID:', error);
        throw new Error('Erro ao recuperar tarefa pelo ID');
    }
}

function isDifferentValues(currentTask, updatedData) {
    if (updatedData.title === null || updatedData.title === "" || updatedData.title === undefined) {
        updatedData.title = currentTask.title;
    }

    if (updatedData.dueDate === null || updatedData.dueDate === "" || updatedData.dueDate === undefined) {
        updatedData.dueDate = currentTask.completed_at;
    }

    if (updatedData.status === null || updatedData.status === "" || updatedData.status === undefined) {
        updatedData.status = currentTask.completed;
    }

    const status = currentTask.completed === 1 ? true : false;
    if (updatedData.title !== currentTask.title 
        || updatedData.dueDate !== currentTask.completed_at
        || updatedData.status !== status) {
            return true;
        }
    return false;
}