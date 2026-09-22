<script setup lang="ts">
import type { Task } from '../types/task'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <li class="todo-item">
    <span :class="{ completed: task.completed }">
      {{ task.title }}
    </span>

    <div class="todo-actions">
      <button type="button" @click="emit('toggle', task.id)">
        {{ task.completed ? 'Reabrir' : 'Concluir' }}
      </button>

      <button type="button" @click="emit('remove', task.id)">
        Remover
      </button>
    </div>
  </li>
</template>
