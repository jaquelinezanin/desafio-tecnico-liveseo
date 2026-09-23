import type { CreateUserPayload, User } from '../types/user'

const API_URL = import.meta.env.VITE_API_URL

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os usuários.')
  }

  return response.json()
}

export async function createUser(
  user: CreateUserPayload,
): Promise<User> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Não foi possível cadastrar o usuário.')
  }

  return response.json()
}
