<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserForm from '../components/UserForm.vue'
import UsersList from '../components/UsersList.vue'
import {
  filterByNumericField,
  getNamesOver23,
  type ExampleUser,
} from '../utils/filterByNumericField'
import { createUser, getUsers } from '../services/users.service'
import type { CreateUserPayload, User } from '../types/user'

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

const users = ref<User[]>([])
const errorMessage = ref('')

async function loadUsers() {
  try {
    users.value = await getUsers()
    errorMessage.value = ''
  } catch {
    errorMessage.value = 'Erro ao carregar usuários.'
  }
}

async function handleCreateUser(user: CreateUserPayload) {
  try {
    await createUser(user)
    await loadUsers()
    errorMessage.value = ''
  } catch {
    errorMessage.value = 'Erro ao cadastrar usuário.'
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <section>
    <h1>Usuários</h1>
    <p>Cadastro e listagem de usuários.</p>

    <UserForm @submit="handleCreateUser" />

    <UsersList :users="users" />
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
    <section class="typescript-demo">
      <h2>Demonstração TypeScript</h2>

      <p>
        Nomes dos usuários com mais de 23 anos:
        <strong>{{ namesOver23.join(', ') }}</strong>
      </p>

      <p>Bônus: filtro genérico por campo numérico</p>

      <ul>
        <li v-for="user in usersOver23" :key="user.id">
          {{ user.name }} - {{ user.age }} anos
        </li>
      </ul>
    </section>
  </section>
</template>
