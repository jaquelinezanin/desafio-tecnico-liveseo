<script setup lang="ts">
import type { User } from '../types/user'

defineProps<{
  users: User[]
}>()
</script>

<template>
  <section class="users-list">
    <h2>Usuários cadastrados</h2>

    <p v-if="users.length === 0">
      Nenhum usuário cadastrado ainda.
    </p>

    <ul v-else>
      <li
        v-for="user in users"
        :key="user.id"
      >
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </section>
</template>
