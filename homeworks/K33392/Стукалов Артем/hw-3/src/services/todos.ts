import { prisma } from 'config/db'
import { TodoNotFound } from 'errors/todos'

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

export async function getByIdSafe(todoId: number): Promise<Todo> {
  const todo = await getById(todoId)
  if (!todo) {
    throw new TodoNotFound()
  }

  return todo
}

export async function cerate(
  title: string,
  description?: string,
): Promise<Todo> {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      createdAt: Math.floor(Date.now() / 1000),
    },
  })

  return todo
}

export async function getWithOffset(
  offset: number,
  count: number,
): Promise<{
  todos: Todo[]
  count: number
}> {
  const query = {
    orderBy: {
      createdAt: 'desc',
    },
    skip: offset,
    take: count,
  } as const

  const { todos, allCount } = await prisma.$transaction(async (tx) => {
    const allCount = await tx.todo.count(query)
    if (allCount === 0) {
      return {
        allCount,
        todos: [],
      }
    }

    const todos = await tx.todo.findMany(query)
    return {
      allCount,
      todos,
    }
  })
  return {
    todos,
    count: allCount,
  }
}
