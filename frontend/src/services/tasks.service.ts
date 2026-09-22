import type { Task } from '../types/task'

const API_URL = 'http://localhost:3000'

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar as tarefas.')
  }

  return response.json()
}

export async function createTask(title: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível criar a tarefa.')
  }

  return response.json()
}

export async function updateTask(
  id: number,
  completed: boolean,
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível atualizar a tarefa.')
  }

  return response.json()
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Não foi possível remover a tarefa.')
  }
}
