import { Todo } from '@prisma/client'

export type TodoGetAllReq = unknown
export type TodoGetAllRes = {
  todos: Todo[]
}

export type TodoGetReq = unknown
export type TodoGetRes = {
  todo: Todo
}

export type TodoDeleteReq = unknown
export type TodoDeleteRes = {
  ok: boolean
}

export type CreateTodoReq = Pick<Todo, 'title' | 'description'>
export type CreateTodoRes = {
  todo: Todo
}

export type UpdateTodoReq = Partial<
  Pick<Todo, 'title' | 'description'>
>
export type UpdateTodoRes = {
  todo: Todo
}

export type ToggleTodoCompletedReq = unknown
export type ToggleTodoCompletedRes = {
  state: Todo['completed']
}
