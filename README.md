# Desafio Técnico Fullstack Júnior

Aplicação fullstack desenvolvida para o desafio técnico de Pessoa Desenvolvedora Fullstack Júnior.

O projeto reúne os exercícios propostos em uma única aplicação local, utilizando Vue 3 no frontend, NestJS no backend e PostgreSQL para persistência dos dados.

## Stack

### Frontend

- Vue 3
- Vite
- TypeScript
- Composition API
- Vue Router
- Fetch API
- CSS puro

### Backend

- NestJS
- TypeScript
- @nestjs/config
- class-validator
- class-transformer
- pg
- SQL puro

### Banco de dados

- PostgreSQL
- Docker Compose

## Arquitetura

```text
Vue 3
+ TypeScript
+ Vue Router
+ CSS puro
       │
       │ fetch / HTTP / JSON
       ▼
NestJS
       │
       │ pg / SQL puro
       ▼
PostgreSQL
       │
       └── Docker
```

O projeto utiliza um único repositório Git com frontend e backend separados.

## Pré-requisitos

Para executar o projeto localmente é necessário ter instalado:

- Node.js
- npm
- Docker Desktop
- Git

## Estrutura resumida

```text
desafio-tecnico/
├── frontend/
│   └── Vue 3 + TypeScript
├── backend/
│   └── NestJS + PostgreSQL
├── README.md
├── SOURCE_OF_TRUTH.md
└── EXPLICACOES.md
```

## Como executar

### 1. Clonar o repositório

```bash

git clone https://github.com/jaquelinezanin/desafio-tecnico-liveseo.git

cd desafio-tecnico-liveseo

```

### 2. Iniciar o PostgreSQL

Entre na pasta do backend:

```bash

cd backend

```

Crie o arquivo `.env` com base no `.env.example`:

```env

DB_HOST=localhost

DB_PORT=5432

DB_NAME=desafio

DB_USER=postgres

DB_PASSWORD=postgres

FRONTEND_URL=http://localhost:5173

```

A variável `FRONTEND_URL` é utilizada na configuração de CORS do backend.

O PostgreSQL será iniciado automaticamente ao executar o backend em modo de desenvolvimento.

O script `npm run start:dev` executa primeiro o comando `npm run db:up`, que sobe o container do PostgreSQL com Docker Compose.

O PostgreSQL ficará disponível na porta:

```text
5432

```

O arquivo `database/init.sql` cria automaticamente as tabelas `users` e `tasks` na primeira inicialização do banco.

### 3. Iniciar o backend

Ainda dentro de `backend/`:

```bash

npm install

npm run start:dev

```

O backend ficará disponível em:

```text

http://localhost:3000

```text
Também estão disponíveis os comandos:

```bash
npm run db:up
npm run db:down

```


### 4. Iniciar o frontend

Abra outro terminal e entre na pasta:

```bash

cd frontend

```

Instale as dependências:

```bash

npm install

```

Crie o arquivo `.env` com base no `.env.example`:

```env

VITE_API_URL=http://localhost:3000

```

A variável `VITE_API_URL` define a URL utilizada pelo frontend para se comunicar com a API.

Depois execute:

```bash

npm run dev

```

O frontend ficará disponível em:

```text

http://localhost:5173

```

## Rotas do frontend

```text

/users

/tasks

```

### /users

Contém:

- formulário de cadastro;

- validação dos campos;

- lista de usuários persistidos;

- demonstração do exercício de TypeScript.

### /tasks

Permite:

- adicionar tarefas;

- concluir tarefas;

- reabrir tarefas;

- remover tarefas;

- filtrar por todas, pendentes e concluídas.

As tarefas são persistidas no PostgreSQL.

## Endpoints da API

### Usuários

```http
GET /users
POST /users
```

Exemplo do `POST /users`:

```json
{
  "name": "Ana",
  "email": "ana@email.com"
}
```

A senha utilizada no formulário do frontend não é enviada nem persistida.

### Tarefas

```http
GET    /tasks
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

Exemplo de criação:

```json
{
  "title": "Estudar Vue"
}
```

Exemplo de atualização:

```json
{
  "completed": true
}
```

## Portas utilizadas

| Serviço | Porta |
|---|---:|
| Vue | 5173 |
| NestJS | 3000 |
| PostgreSQL | 5432 |

## Banco de dados

O acesso ao PostgreSQL é feito diretamente com o driver `pg`.

Não foi utilizado ORM.

As queries são escritas em SQL puro e executadas através do `DatabaseService`.

## Validação

O frontend utiliza validações nativas do HTML, como:

```text
required
type="email"
minlength
```

O backend utiliza DTOs com:

```text
class-validator
class-transformer
```

e `ValidationPipe` global do NestJS.

## Build

Para validar o frontend:

```bash
cd frontend
npm run build
```

Para validar o backend:

```bash
cd backend
npm run build
```

## Documentação do desafio

As explicações dos Cases 1 a 8, bônus, estratégia de commits, decisões técnicas e uso de ferramentas de IA estão em:

```text
EXPLICACOES.md
```

As decisões oficiais de arquitetura e escopo estão documentadas em:

```text
SOURCE_OF_TRUTH.md
```

## Repositório

https://github.com/jaquelinezanin/desafio-tecnico-liveseo