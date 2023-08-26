# Documentação TO DO API

## Descrição

Nessa API você poderá realizar o CRUD de suas *tasks* (tarefas).

Você pode realizar as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Listar uma task pelo `id`
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- Importação de tasks em massa por um arquivo CSV

## Tecnologias utilizadas

API desenvolvida com **NodeJS** e a biblioteca **CSV-Parse** para realizar importação em massa de um arquivo csv.

## Pré requisitos

- **NodeJS** e **npm** instalados.

## Clone o repositório

```sh
git clone https://github.com/joaofreitas91/node-js-to-do-api.git
```
## Instale as dependências

Navegue até o diretório do projeto e instale as dependencias:
  
  ```sh
  cd node-js-to-do-api
  npm install
  ```
## Inicie o servidor

Inicialize o servidor usando o seguinte comando:
  
  ```sh
  npm run dev
  ```
A API estará disponível na url: http://localhost:3333.

## Importação de tasks em massa por um arquivo CSV
Após clonar o respositório e iniciar o servidor, execute o comando:
```sh
  npm run import-csv
```
Esse comando irá executar a importação em massa do arquivo .csv que está dentro da pasta `src/streams/tasks.csv`

## Collection do Postman
Faça o download da collection do postman [AQUI!](https://github.com/joaofreitas91/node-js-to-do-api/blob/main/src/assets/To-Do-API.postman_collection.json) - O mesmo arquivo está dentro do repositório no caminho `src/assets/To-Do-API.postman_collection.json`

## API Endpoints

### Listar todos as tasks

- **URL:** `/tasks`
- **Method:** GET
- **Query Parameters:**
  - `search` (opcional) - Search query para filtrar tasks pelo `title` ou `description`.
- **Success Response:**
  - **Code:** 200 OK

### Retornar uma task pelo ID

- **URL:** `/tasks/:id`
- **Method:** GET
- **URL Parameters:**
  - `id` - ID da task.
- **Success Response:**
  - **Code:** 200 OK
- **Error Response:**
  - **Code:** 404 Resource not found

### Criar uma nova task

- **URL:** `/tasks`
- **Method:** POST
- **Request Body:**
  - `title` - Título da task (obrigatório).
  - `description` - Descrição detalhada da task (obrigatório).
- **Success Response:**
  - **Code:** 201 Created
- **Error Response:**
  - **Code:** 400 Missing required fields

### Marcar uma task como concluída

- **URL:** `/tasks/:id`
- **Method:** PATCH
- **URL Parameters:**
  - `id` - ID da task a ser marcada como concluída.
- **Success Response:**
  - **Code:** 204 No Content
- **Error Response:**
  - **Code:** 404 Resource not found

### Atualizar uma task

- **URL:** `/tasks/:id`
- **Method:** PUT
- **URL Parameters:**
  - `id` - ID da task a ser atualizada.
- **Request Body:**
  - `title` - Atualiza o título da task (Opcional).
  - `description` - Atualiza a descrição de uma task (Opcional).
- **Success Response:**
  - **Code:** 204 No Content
- **Error Response:**
  - **Code:** 404 Resource not found

### Remover uma task

- **URL:** `/tasks/:id`
- **Method:** DELETE
- **URL Parameters:**
  - `id` - ID da task a ser removido.
- **Success Response:**
  - **Code:** 204 No Content
- **Error Response:**
  - **Code:** 404 Resource not found
