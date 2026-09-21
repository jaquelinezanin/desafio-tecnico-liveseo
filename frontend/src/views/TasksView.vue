<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoForm from '../components/TodoForm.vue'
import TodoItem from '../components/TodoItem.vue'
import type { Task } from '../types/task'

type TaskFilter = 'all' | 'pending' | 'completed'

const tasks = ref<Task[]>([])
const filter = ref<TaskFilter>('all')

const filteredTasks = computed(() => {
  if (filter.value === 'pending') {
    return tasks.value.filter((task) => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter((task) => task.completed)
  }

  return tasks.value
})

function addTask(title: string) {
  tasks.value.push({
    id: Date.now(),
    title,
    completed: false,
  })
}

function toggleTask(id: number) {
  const task = tasks.value.find((task) => task.id === id)

  if (task) {
    task.completed = !task.completed
  }
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <section>
    <h1>Tarefas</h1>
    <p>Organize suas tarefas.</p>

    <TodoForm @add="addTask" />

    <div class="task-filters">
      <button type="button" @click="filter = 'all'">
        Todas
      </button>

      <button type="button" @click="filter = 'pending'">
        Pendentes
      </button>

      <button type="button" @click="filter = 'completed'">
        Concluídas
      </button>
    </div>

    <ul class="todo-list">
      <TodoItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @remove="removeTask"
      />
    </ul>

    <p v-if="filteredTasks.length === 0">
      Nenhuma tarefa encontrada.
    </p>
  </section>
</template>
