<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import TodoItem from '../components/TodoItem.vue'
import type { Task } from '../types/task'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../services/tasks.service'

type TaskFilter = 'all' | 'pending' | 'completed'

const tasks = ref<Task[]>([])
const filter = ref<TaskFilter>('all')
const errorMessage = ref('')

const filteredTasks = computed(() => {
  if (filter.value === 'pending') {
    return tasks.value.filter((task) => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter((task) => task.completed)
  }

  return tasks.value
})

async function loadTasks() {
  try {
    tasks.value = await getTasks()
    errorMessage.value = ''
  } catch {
    errorMessage.value = 'Erro ao carregar tarefas.'
  }
}

async function addTask(title: string) {
  try {
    await createTask(title)
    await loadTasks()
    errorMessage.value = ''
  } catch {
    errorMessage.value = 'Erro ao adicionar tarefa.'
  }
}

async function toggleTask(id: number) {
  const task = tasks.value.find((task) => task.id === id)

  if (!task) {
    return
  }

  try {
    await updateTask(id, !task.completed)
    await loadTasks()
    errorMessage.value = ''
  } catch {
    errorMessage.value = 'Erro ao atualizar tarefa.'
  }
}

async function removeTask(id: number) {
  try {
    await deleteTask(id)
    await loadTasks()
    errorMessage.value = ''
  } catch {
    errorMessage.value = 'Erro ao remover tarefa.'
  }
}

onMounted(() => {
  loadTasks()
})
</script>

<template>
  <section>
    <h1>Tarefas</h1>
    <p>Organize suas tarefas.</p>

    <TodoForm @add="addTask" />

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <div class="task-filters">
  <button
    type="button"
    :class="{ active: filter === 'all' }"
    @click="filter = 'all'"
  >
    Todas
  </button>

  <button
    type="button"
    :class="{ active: filter === 'pending' }"
    @click="filter = 'pending'"
  >
    Pendentes
  </button>

  <button
    type="button"
    :class="{ active: filter === 'completed' }"
    @click="filter = 'completed'"
  >
    Concluídas
  </button>
</div>

    <ul class="todo-list">
      <TodoItem v-for="task in filteredTasks" :key="task.id" :task="task" @toggle="toggleTask" @remove="removeTask" />
    </ul>

    <p v-if="filteredTasks.length === 0">
      Nenhuma tarefa encontrada.
    </p>
  </section>
</template>
