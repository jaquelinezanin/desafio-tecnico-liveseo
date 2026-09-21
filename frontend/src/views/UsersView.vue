<script setup lang="ts">
import UserForm from '../components/UserForm.vue'
import UsersList from '../components/UsersList.vue'
</script>

<template>
  <section>
    <h1>Usuários</h1>
    <p>Cadastro e listagem de usuários.</p>

    <UserForm />
    
    <UsersList />
  </section>
</template>
