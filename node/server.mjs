import express from 'express';
import { createTask } from './routes/tasks/create.mjs';
import { loadTask } from './routes/tasks/load.mjs';
import { validateUser } from './routes/tasks/login.mjs';
import { updateTask } from './routes/tasks/update.mjs';

const app = express();

app.use(express.json());

app.post('/tasks', async (req, res, next) => {
    const { title, dueDate, status } = req.body;
    await createTask({
        title: title,
        dueDate: dueDate,
        status: status
    })

    res.status(201).end();
});

app.get('/tasks', async (req, res) => {
    const tasks = await loadTask();
    res.json(tasks);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.patch('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, dueDate, status } = req.body;

    try {
        const message = await updateTask(taskId, { title, dueDate, status });
        res.status(200).json({ message: message });
    } catch (error) {
        console.error('Erro ao editar tarefa:', error);
        res.status(500).json({ error: 'Erro ao editar tarefa' });
    }
});

app.listen(8888, () => {
    console.log('Node, com express, em execução na porta 8888');
});

app.post('/login', async (req, res) => {
    console.log('chegou um POST');
    const isValid = await validateUser({
        password: req.body.password
    })
    
    console.log("isValid: ", isValid);
    
    if (isValid) {
        res.status(200).end();
    } else {
        res.status(401).json({ error: 'Usuário ou senha incorretos' });
    }
});