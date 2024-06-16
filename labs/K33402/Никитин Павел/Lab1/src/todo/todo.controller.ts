import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy'
import { RequestWithUser } from 'src/auth/auth.controller'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
  ToggleTodoCompletedRes,
  TodoGetAllRes,
  TodoGetRes,
  TodoDeleteRes,
  CreateTodoReq,
  CreateTodoRes,
  UpdateTodoReq,
  UpdateTodoRes,
} from 'src/types/api/Todo'
import { CreateTodoDto } from './dto/create-todo.dto'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @ApiBearerAuth()
  async getTodos(@Request() req: RequestWithUser): Promise<TodoGetAllRes> {
    const todos = await this.todoService.todos({
      where: {
        userId: req.user.userId,
      },
    })
    return { todos }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  async getTodo(@Param('id') id: string): Promise<TodoGetRes> {
    const todo = await this.todoService.todo({
      id: Number(id),
    })
    return { todo }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/toggleCompletedState')
  @ApiBearerAuth()
  async toggleCompletedState(
    @Param('id') id: string
  ): Promise<ToggleTodoCompletedRes> {
    const todo = await this.todoService.toggleCompletedState(Number(id))
    return { state: todo.completed }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<TodoDeleteRes> {
    await this.todoService.deleteTodo({ id: Number(id) })
    return { ok: true }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth()
  async createTodo(
    @Request() req: RequestWithUser,
    @Body() data: CreateTodoDto
  ): Promise<CreateTodoRes> {
    const todo = await this.todoService.createTodo(req.user.userId, data)
    return { todo }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/update')
  @ApiBearerAuth()
  async updateTodo(
    @Param('id') id: string,
    @Body() data: CreateTodoDto
  ): Promise<UpdateTodoRes> {
    const todo = await this.todoService.updateTodo({
      data,
      where: {
        id: Number(id),
      },
    })
    return { todo }
  }
}
