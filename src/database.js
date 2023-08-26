import fs from 'fs/promises'

const path = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(path)
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this._persist()
      })
  }

  _persist() {
    fs.writeFile(path, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      const paramsToSearch = {
        title: search,
        description: search,
      }

      data = data.filter((row) => {
        return Object.entries(paramsToSearch).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  create(table, data) {
    if (this.#database[table]) {
      this.#database[table] = [...this.#database[table], data]
    } else {
      this.#database[table] = [data]
    }

    this._persist()
  }

  update(table, id, data) {
    this.#database[table] = this.#database[table].map((row) => {
      if (row.id === id) {
        return { ...row, updated_at: new Date().toISOString(), ...data }
      }

      return row
    })

    this._persist()
  }

  delete(table, id) {
    this.#database[table] = this.#database[table].filter(
      (data) => data.id !== id,
    )

    this._persist()
  }

  complete(table, id, key) {
    this.#database[table] = this.#database[table].map((row) => {
      if (row.id === id) {
        return {
          ...row,
          updated_at: new Date().toISOString(),
          [key]: row[key] ? null : new Date().toISOString(),
        }
      }

      return row
    })

    this._persist()
  }
}
