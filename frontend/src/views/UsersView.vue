<script setup lang="ts">
import UserForm from '../components/UserForm.vue'
import UsersList from '../components/UsersList.vue'
import {
  filterByNumericField,
  getNamesOver23,
  type ExampleUser,
} from '../utils/filterByNumericField'

const exampleUsers: ExampleUser[] = [
  { id: 1, name: 'Ana', age: 25 },
  { id: 2, name: 'Pedro', age: 30 },
  { id: 3, name: 'Maria', age: 22 },
]

const namesOver23 = getNamesOver23(exampleUsers)

const usersOver23 = filterByNumericField(
  exampleUsers,
  'age',
  23,
)
</script>

<template>
  <section>
    <h1>Usuários</h1>
    <p>Cadastro e listagem de usuários.</p>

    <UserForm />

    <UsersList />
    <section class="typescript-demo">
  <h2>Demonstração TypeScript</h2>

  <p>
    Nomes dos usuários com mais de 23 anos:
    <strong>{{ namesOver23.join(', ') }}</strong>
  </p>

  <p>Bônus: filtro genérico por campo numérico</p>

  <ul>
    <li
      v-for="user in usersOver23"
      :key="user.id"
    >
      {{ user.name }} - {{ user.age }} anos
    </li>
  </ul>
</section>
  </section>
</template>
