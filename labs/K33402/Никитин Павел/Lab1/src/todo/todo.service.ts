import { Injectable, NotFoundException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { Prisma, Todo, User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async todo(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput
  ): Promise<Todo | null> {
    return await this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    })
  }

  async todos(params: {
    skip?: number
    take?: number
    cursor?: Prisma.TodoWhereUniqueInput
    where?: Prisma.TodoWhereInput
    orderBy?: Prisma.TodoOrderByWithRelationInput
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createTodo(
    userId: User['id'],
    data: Prisma.TodoCreateInput
  ): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        ...data,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput
    data: Prisma.TodoUpdateInput
  }): Promise<Todo> {
    const { where, data } = params
    try {
      return await this.prisma.todo.update({
        data: {
          ...data,
          dateUpdated: new Date(),
        },
        where,
      })
    } catch (e) {
      throw new NotFoundException('Todo not found')
    }
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return await this.prisma.todo.delete({
      where,
    })
  }

  async toggleCompletedState(id: Todo['id']): Promise<Todo> {
    const prev = await this.todo({ id })

    if (!prev) {
      throw new NotFoundException('Todo not found')
    }

    return await this.prisma.todo.update({
      data: {
        completed: !prev.completed,
      },
      where: {
        id,
      },
    })
  }
}
