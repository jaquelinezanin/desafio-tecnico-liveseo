<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')

const emit = defineEmits<{
  add: [title: string]
}>()

function handleSubmit() {
  const trimmedTitle = title.value.trim()

  if (!trimmedTitle) {
    return
  }

  emit('add', trimmedTitle)
  title.value = ''
}
</script>

<template>
  <form class="todo-form" @submit.prevent="handleSubmit">
    <input
      v-model="title"
      type="text"
      placeholder="Nova tarefa"
      required
    />

    <button type="submit">
      Adicionar
    </button>
  </form>
</template>
