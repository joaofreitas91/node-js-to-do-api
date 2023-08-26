import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRouterPathRegExp } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRouterPathRegExp('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select('tasks', search)

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'GET',
    path: buildRouterPathRegExp('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const tasks = database.select('tasks')

      const uniqueTask = tasks.find((task) => task.id === id)

      if (uniqueTask) {
        return res.end(JSON.stringify(uniqueTask))
      }

      return res
        .writeHead(404)
        .end(JSON.stringify({ error: 'Resource not found' }))
    },
  },
  {
    method: 'POST',
    path: buildRouterPathRegExp('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (title && description) {
        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        database.create('tasks', task)

        return res.writeHead(201).end()
      }

      return res
        .writeHead(400)
        .end(JSON.stringify({ error: 'Missing required fields' }))
    },
  },
  {
    method: 'PATCH',
    path: buildRouterPathRegExp('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const tasks = database.select('tasks')
      const hasTask = tasks.some((task) => task.id === id)

      if (hasTask) {
        database.complete('tasks', id, 'completed_at')
        return res.writeHead(204).end()
      }

      return res
        .writeHead(404)
        .end(JSON.stringify({ error: 'Resource not found' }))
    },
  },
  {
    method: 'PUT',
    path: buildRouterPathRegExp('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const tasks = database.select('tasks')
      const hasTask = tasks.some((task) => task.id === id)

      if (hasTask) {
        if (title || description) {
          const task = {}

          if (title) {
            task.title = title
          }

          if (description) {
            task.description = description
          }

          database.update('tasks', id, task)
          return res.writeHead(204).end()
        } else {
          return res
            .writeHead(400)
            .end(JSON.stringify({ error: 'Missing required fields' }))
        }
      }

      return res
        .writeHead(404)
        .end(JSON.stringify({ error: 'Resource not found' }))
    },
  },
  {
    method: 'DELETE',
    path: buildRouterPathRegExp('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const tasks = database.select('tasks')
      const hasTask = tasks.some((task) => task.id === id)

      if (hasTask) {
        database.delete('tasks', id)
        return res.end()
      }

      return res
        .writeHead(404)
        .end(JSON.stringify({ error: 'Resource not found' }))
    },
  },
]
