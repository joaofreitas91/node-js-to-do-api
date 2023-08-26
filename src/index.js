import { createServer } from 'http'
import { jsonMiddleware } from './middleware/jsonMiddleware.js'
import { extractQueryParams } from './utils/extract-query-params.js'
import { routes } from './routes.js'

const server = createServer(async (req, res) => {
  await jsonMiddleware(req, res)

  const { method, url } = req

  const route = routes.find((route) => {
    return method === route.method && url.match(route.path)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params || {}
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  res.writeHead(404).end(JSON.stringify({ error: 'not found' }))
})

const port = 3333

server.listen(port, () =>
  console.log(`Server running - http://localhost:${port}/`),
)
