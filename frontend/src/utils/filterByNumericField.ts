export type ExampleUser = {
  id: number
  name: string
  age: number
}

export function getNamesOver23(users: ExampleUser[]): string[] {
  return users
    .filter((user) => user.age > 23)
    .map((user) => user.name)
}

export function filterByNumericField<
  K extends PropertyKey,
  T extends Record<K, number>,
>(
  items: T[],
  field: K,
  minimumValue: number,
): T[] {
  return items.filter((item) => item[field] > minimumValue)
}
