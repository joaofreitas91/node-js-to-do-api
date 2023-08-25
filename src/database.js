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
        this.persist()
      })
  }

  persist() {
    fs.writeFile(path, JSON.stringify(this.#database))
  }

  select(table) {
    return this.#database[table] ?? []
  }

  create(table, data) {
    if (this.#database[table]) {
      this.#database[table] = [...this.#database[table], data]
    } else {
      this.#database[table] = [data]
    }

    this.persist()
  }
}
