import { createServer } from 'http'

const server = createServer((req, res) => {
  const { method, url } = req

  console.log({ method, url })

  res.end('Hello World!')
})

const port = 3333

server.listen(port, () =>
  console.log(`Server running - http://localhost:${port}/`),
)
