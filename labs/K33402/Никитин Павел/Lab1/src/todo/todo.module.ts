import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { UserService } from '../user/user.service'
import { ConfigService } from '../config/config.service'

@Module({
  providers: [TodoService, ConfigService, UserService],
  controllers: [TodoController],
})
export class TodoModule {}
