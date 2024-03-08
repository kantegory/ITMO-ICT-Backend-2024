import { prisma } from 'config/db'

import { Todo } from '@prisma/client'

export async function getById(todoId: number): Promise<Todo | undefined> {
  const todo =
    (await prisma.todo.findFirst({
      where: {
        id: todoId,
      },
    })) || undefined

  return todo
}
