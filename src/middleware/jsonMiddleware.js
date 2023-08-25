export async function jsonMiddleware(req, res) {
  const body = []

  for await (const chunk of req) {
    body.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(body).toString())
  } catch {
    req.body = {}
  }

  res.setHeader('Content-Type', 'application/json')
}
