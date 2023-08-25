import { createServer } from 'http'
import { randomUUID } from 'crypto'
import { jsonMiddleware } from './middleware/jsonMiddleware.js'

const tasks = []

const server = createServer(async (req, res) => {
  await jsonMiddleware(req, res)

  const {
    method,
    url,
    body: { title, description },
  } = req

  if (method === 'POST' && url === '/tasks') {
    tasks.push({
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: null,
    })

    res.end()
    return
  }

  if (method === 'GET' && url === '/tasks') {
    res.end(JSON.stringify(tasks))

    return
  }

  res.writeHead(404).end(JSON.stringify({ error: 'not found' }))
})

const port = 3333

server.listen(port, () =>
  console.log(`Server running - http://localhost:${port}/`),
)
