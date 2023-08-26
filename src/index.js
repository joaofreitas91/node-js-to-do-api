import { createServer } from 'http'
import { jsonMiddleware } from './middleware/jsonMiddleware.js'
import { routes } from './routes.js'

const server = createServer(async (req, res) => {
  await jsonMiddleware(req, res)

  const { method, url } = req

  const route = routes.find((route) => {
    return method === route.method && url === route.path
  })

  if (route) {
    return route.handler(req, res)
  }

  res.writeHead(404).end(JSON.stringify({ error: 'not found' }))
})

const port = 3333

server.listen(port, () =>
  console.log(`Server running - http://localhost:${port}/`),
)
