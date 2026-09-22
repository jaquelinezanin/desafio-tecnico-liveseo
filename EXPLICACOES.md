# Explicações do Desafio Técnico

Arquivo utilizado para explicar cada case do desafio, com decisões tomadas durante o desenvolvimento e utilização das ferramentas de IA no processo.

Minha ideia foi transformar os exercícios em uma aplicação fullstack única, simples e integrada, mantendo o código fácil de entender e explicar.

## Case 1: HTML + CSS

Criei o formulário de cadastro na página de usuários com os campos Nome, E-mail e Senha.

Para as validações básicas utilizei recursos nativos do HTML, como:

```html
required
type="email"
minlength="6"
```

Também utilizei `v-model` para ligar os campos ao estado do componente Vue.

O CSS foi organizado em um único arquivo global, `src/style.css`. Preferi CSS puro porque era suficiente para o projeto e também permitia demonstrar os fundamentos pedidos no desafio sem adicionar bibliotecas de interface.

A senha existe apenas para atender ao exercício do formulário. Ela é validada no frontend, mas não é enviada para a API e não é salva no banco de dados.

## Case 2: Vue 3 com Composition API

Implementei uma lista de tarefas na rota `/tasks`.

Ela permite:

* adicionar tarefas;
* concluir tarefas;
* reabrir tarefas;
* remover tarefas;
* visualizar todas;
* visualizar apenas pendentes;
* visualizar apenas concluídas.

Separei a interface em `TodoForm.vue`, responsável pela criação de uma nova tarefa, e `TodoItem.vue`, responsável por exibir cada item e suas ações.

Na `TasksView.vue` fica o estado principal da página e a comunicação com a API.

Utilizei `ref` para os estados que podem mudar, como a lista de tarefas e o filtro atual.

Exemplo:

```ts
const tasks = ref<Task[]>([])
const filter = ref<TaskFilter>('all')
```

Também utilizei `computed` para gerar a lista filtrada com base no filtro selecionado.

```ts
const filteredTasks = computed(() => {
  if (filter.value === 'pending') {
    return tasks.value.filter((task) => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter((task) => task.completed)
  }

  return tasks.value
})
```

Escolhi `computed` porque a lista filtrada depende de outros estados e deve ser recalculada automaticamente sempre que eles mudarem.

As tarefas são persistidas no PostgreSQL através da API NestJS.

## Case 3: TypeScript

Para o exercício de TypeScript utilizei os dados apresentados no próprio desafio:

```ts
const users = [
  { id: 1, name: 'Ana', age: 25 },
  { id: 2, name: 'Pedro', age: 30 },
  { id: 3, name: 'Maria', age: 22 },
]
```

Criei um tipo para representar esses usuários e uma função que recebe o array tipado e retorna apenas os nomes de quem possui mais de 23 anos.

```ts
export function getNamesOver23(users: ExampleUser[]): string[] {
  return users
    .filter((user) => user.age > 23)
    .map((user) => user.name)
}
```

O retorno é `string[]` porque, depois de filtrar os usuários, utilizo `map` para retornar apenas os nomes.

Também implementei o bônus com uma função genérica capaz de filtrar objetos por um campo numérico.

```ts
export function filterByNumericField<
  K extends PropertyKey,
  T extends Record<K, number>,
>(
  items: T[],
  field: K,
  minimumValue: number,
): T[] {
  return items.filter((item) => item[field] > minimumValue)
}
```

O objetivo foi permitir que a função não dependesse especificamente do campo `age`.

Mantive esse exercício separado dos usuários reais da aplicação. Por isso, `age` não foi adicionado à tabela `users` do banco.

## Case 4: Banco de Dados e SQL

Para este exercício considerei o MySQL indicado no enunciado.

A primeira consulta lista todos os usuários do mais recente para o mais antigo:

```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC;
```

O `ORDER BY created_at DESC` ordena os registros pelo campo `created_at` em ordem decrescente. Dessa forma, os usuários criados mais recentemente aparecem primeiro.

### Bônus: quantidade de usuários por mês

Em MySQL, utilizei:

```sql
SELECT
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    COUNT(*) AS total
FROM users
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;
```

O `DATE_FORMAT(created_at, '%Y-%m')` transforma a data em uma representação contendo apenas ano e mês.

Depois, o `GROUP BY` agrupa os usuários que pertencem ao mesmo mês e o `COUNT(*)` conta quantos registros existem em cada grupo.

### Banco utilizado na aplicação integrada

Embora o Case 4 utilize MySQL como referência, na aplicação fullstack optei por PostgreSQL para manter um único banco integrado ao backend e às funcionalidades de usuários e tarefas.

O PostgreSQL é executado com Docker Compose e as tabelas reais da aplicação são criadas pelo arquivo:

Ybackend/database/init.sql
```

O acesso ao banco é feito diretamente pelo pacote `pg`, utilizando SQL puro e sem ORM.

Como PostgreSQL e MySQL possuem diferenças de dialeto, a versão equivalente da consulta mensal utilizada no PostgreSQL é:

```sql
SELECT
    TO_CHAR(created_at, 'YYYY-MM') AS month,
    COUNT(*) AS total
FROM users
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC;
```

Assim, mantive a resposta do exercício de acordo com o MySQL citado no enunciado, enquanto a aplicação integrada utiliza PostgreSQL.

## Case 5: Backend com NestJS

O backend foi organizado por feature.

src/
├── database/
├── users/
├── tasks/
├── app.module.ts
└── main.ts
```

As features de usuários e tarefas possuem controller, service e module. A parte de banco possui um module e um service próprios para centralizar a conexão com PostgreSQL.

Por exemplo:

users/
├── dto/
│   └── create-user.dto.ts
├── users.controller.ts
├── users.service.ts
└── users.module.ts
```

O controller recebe as requisições HTTP.

O service concentra a lógica e executa as operações necessárias no banco.

O module registra os controllers e services da feature.

Implementei os endpoints:

```http
GET /users
POST /users

GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id
```

Apesar de o desafio permitir que os usuários fossem armazenados apenas em memória, optei por integrar tudo ao PostgreSQL para demonstrar o fluxo completo da aplicação.

## Acesso ao banco no backend

Criei um `DatabaseService` utilizando `Pool` do pacote `pg`.

Ele centraliza a conexão com o PostgreSQL e expõe um método simples para executar queries.

O fluxo fica assim:

Controller
    ↓
Service
    ↓
DatabaseService
    ↓
pg
    ↓
PostgreSQL
```

Não utilizei Prisma, TypeORM ou outro ORM.

As queries foram escritas diretamente em SQL.

Também utilizei parâmetros como `$1` e `$2` nas queries em vez de concatenar valores diretamente.

Exemplo:

```sql
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING id, name, email, created_at
```

## DTOs e validação

Utilizei `class-validator` e o `ValidationPipe` do NestJS para validar os dados recebidos pela API.

Exemplo:

```ts
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string
}
```

Isso faz com que dados inválidos sejam bloqueados antes de chegarem à lógica do service.

Também habilitei o `ValidationPipe` globalmente no `main.ts`.

## Integração entre frontend e backend

No frontend centralizei as requisições HTTP nos arquivos:

src/services/users.service.ts
src/services/tasks.service.ts
```

Utilizei o `fetch` nativo.

O fluxo de cadastro de usuário, por exemplo, ficou:

UserForm
    ↓
UsersView
    ↓
users.service.ts
    ↓
fetch
    ↓
POST /users
    ↓
NestJS
    ↓
PostgreSQL
```

Depois do cadastro, a lista é carregada novamente através do `GET /users`.

O mesmo princípio foi utilizado na página de tarefas.

Também habilitei CORS no NestJS para permitir requisições do frontend local em:

http://localhost:5173
```

## Case 6: Git

Utilizei um único repositório Git para todo o projeto.

Separei os commits de acordo com unidades reais de desenvolvimento.

Alguns exemplos foram:

chore: initialize project structure

feat: implementei navegação entre usuários e tarefas

feat: implementei estrutura do backend e banco PostgreSQL
```

A ideia foi deixar o histórico mostrando a evolução real do projeto, em vez de fazer apenas um commit com tudo pronto.

O frontend, backend, documentação e arquivos do banco ficam no mesmo repositório.

## Case 7: Organização do Projeto

No frontend organizei os arquivos por responsabilidade.

src/
├── components/
├── views/
├── services/
├── types/
├── utils/
├── router/
├── App.vue
├── main.ts
└── style.css
```

Os componentes representam partes menores da interface.

As views representam as páginas ligadas às rotas.

Os services concentram as chamadas HTTP.

Os types concentram os tipos TypeScript compartilhados.

Os utils guardam funções que não pertencem diretamente à interface.

No backend organizei por feature.

src/
├── database/
├── users/
├── tasks/
├── app.module.ts
└── main.ts
```

Escolhi essa estrutura porque ela mantém as responsabilidades separadas sem adicionar uma arquitetura mais complexa do que o projeto precisa.

## Case 8: Cenário de tela de login lenta

Eu começaria a investigação pelo navegador, principalmente pela aba Network do DevTools.

Primeiro verificaria:

* tempo total da requisição;
* TTFB;
* requests muito lentas;
* requests duplicadas;
* tamanho das respostas;
* códigos HTTP retornados.

Depois tentaria identificar em qual camada está o gargalo.

Se o tempo estiver principalmente no backend, verificaria logs, processamento desnecessário, chamadas externas e o tempo das queries.

Se o problema estiver no banco, verificaria queries lentas, quantidade de consultas realizadas e se existem índices adequados.

Se estiver no frontend, verificaria o tamanho do bundle, requests disparadas durante o carregamento e renderizações desnecessárias.

Duas possíveis soluções dependeriam da causa encontrada.

Se a query estiver lenta, uma solução pode ser otimizar a consulta ou criar um índice adequado.

Se o frontend estiver fazendo requests duplicadas, uma solução pode ser corrigir o fluxo para evitar chamadas desnecessárias.

Eu evitaria escolher uma solução antes de identificar em qual camada está o problema.

## Docker

Utilizei Docker apenas para o PostgreSQL.

Frontend e backend são executados diretamente com Node.js.

O banco é iniciado com:

```bash
docker compose up -d
```

Essa escolha mantém o ambiente de banco reproduzível sem aumentar a complexidade do restante da aplicação.

## Uso de ferramentas de IA

Utilizei o ChatGPT durante o desenvolvimento como apoio para planejamento, debugging, revisão de código e explicação de conceitos.

Procurei usar a IA como ferramenta de apoio, mas sempre validando o resultado no código e executando os testes manualmente.

Um exemplo concreto aconteceu durante a configuração inicial do projeto.

O comando de criação do Vite começou a falhar antes mesmo de o projeto ser criado. A partir do log do npm consegui identificar, com apoio da IA, que o problema estava na instalação interna do npm e não no Vue.

Também utilizei a IA durante outros problemas reais do desenvolvimento, como imports antigos do scaffold do Vite, configuração do Docker, limpeza de arquivos e dependências desnecessárias geradas pelos scaffolds e integração entre frontend e backend.

Esses momentos foram úteis principalmente porque o processo não ficou apenas em copiar uma solução. Eu conseguia analisar o erro, entender qual camada estava falhando e aplicar uma correção pequena antes de testar novamente.

## MCP, agentes e skills de IA

Já tinha contato com o conceito de MCP em nível exploratório.
Entendo o Model Context Protocol como uma forma padronizada de permitir que modelos de IA se conectem a ferramentas, serviços e fontes de dados externas. Em vez de cada integração precisar ser construída de uma forma completamente diferente, o MCP cria um padrão de comunicação entre o modelo e essas ferramentas.

Também entendo agentes e skills como formas de ampliar o que uma IA consegue fazer além de apenas responder texto.
Por exemplo, um agente pode receber uma tarefa, consultar ferramentas, tomar decisões dentro de um fluxo e executar diferentes etapas até chegar ao resultado. Ferramentas como n8n também podem ser utilizadas para montar automações em que modelos de IA fazem parte de um fluxo maior.

Meu conhecimento nessa parte ainda é exploratório, mas tenho interesse em entender melhor como essas ferramentas podem ser aplicadas em projetos e automações reais.

## Decisões gerais do projeto

Durante o desenvolvimento tentei manter a solução simples.

Evitei adicionar bibliotecas quando os recursos nativos já eram suficientes.

Por isso utilizei:

fetch em vez de Axios
ref e computed em vez de uma store global
CSS puro
SQL puro
pg sem ORM
```

Também preferi implementar e validar o projeto por etapas, manualmente.

Sempre que aparecia algum erro, primeiro tentei identificar se ele estava no frontend, backend, conexão HTTP, Docker ou banco antes de alterar o código.

O objetivo final foi construir uma aplicação que funcionasse de ponta a ponta, mas que eu também conseguisse entender, explicar e modificar.