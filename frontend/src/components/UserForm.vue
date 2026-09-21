<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

function handleSubmit() {
  console.log('Formulário válido')
}
</script>

<template>
  <form class="user-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Nome</label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Senha</label>
      <input
        id="password"
        v-model="password"
        type="password"
        minlength="6"
        required
      />
    </div>

    <button type="submit">
      Cadastrar
    </button>
  </form>
</template>
