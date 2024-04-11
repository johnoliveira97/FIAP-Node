// server.mjs
import express from 'express';
import { createTask } from './routes/tasks/create.mjs';
import { loadTask } from './routes/tasks/load.mjs';

const app = express();

app.use(express.json());

app.post('/tasks', async (req, res, next) => {
    console.log('chegou um POST');
    await createTask({
        title: req.body.title
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

app.listen(3000, () => {
    console.log('Node, com express, em execução na porta 3000');
});

/*import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});*/

// run with `node server.mjs`