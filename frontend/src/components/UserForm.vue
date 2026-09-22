<script setup lang="ts">
import { ref } from 'vue'
import type { CreateUserPayload } from '../types/user'

const name = ref('')
const email = ref('')
const password = ref('')
const emit = defineEmits<{
  submit: [user: CreateUserPayload]
}>()

function handleSubmit() {
  emit('submit', {
    name: name.value,
    email: email.value,
  })

  name.value = ''
  email.value = ''
  password.value = ''
}
</script>

<template>
  <form class="user-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Nome</label>
      <input id="name" v-model="name" type="text" required />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <input id="email" v-model="email" type="email" required />
    </div>

    <div class="form-group">
      <label for="password">Senha</label>
      <input id="password" v-model="password" type="password" minlength="6" required />
    </div>

    <button type="submit">
      Cadastrar
    </button>
  </form>
</template>
