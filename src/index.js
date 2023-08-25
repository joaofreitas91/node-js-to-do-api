import { createServer } from 'http'
import { randomUUID } from 'crypto'

const tasks = []

const server = createServer((req, res) => {
  const { method, url } = req

  if (method === 'POST' && url === '/tasks') {
    tasks.push({
      id: randomUUID(),
      title: 'Make a sandwich',
      description: 'I need eat a delicious sandwich',
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: null,
    })

    res.end()
    return
  }

  if (method === 'GET' && url === '/tasks') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(tasks))

    return
  }

  res.writeHead(404).end(JSON.stringify({ error: 'not found' }))
})

const port = 3333

server.listen(port, () =>
  console.log(`Server running - http://localhost:${port}/`),
)
