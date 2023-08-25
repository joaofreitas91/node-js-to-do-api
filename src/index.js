import { createServer } from 'http'
import { randomUUID } from 'crypto'
import { jsonMiddleware } from './middleware/jsonMiddleware.js'
import { Database } from './database.js'

const database = new Database()

const server = createServer(async (req, res) => {
  await jsonMiddleware(req, res)

  const {
    method,
    url,
    body: { title, description },
  } = req

  if (method === 'POST' && url === '/tasks') {
    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: null,
    }

    database.create('tasks', task)

    return res.end()
  }

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.select('tasks')

    return res.end(JSON.stringify(tasks))
  }

  res.writeHead(404).end(JSON.stringify({ error: 'not found' }))
})

const port = 3333

server.listen(port, () =>
  console.log(`Server running - http://localhost:${port}/`),
)
