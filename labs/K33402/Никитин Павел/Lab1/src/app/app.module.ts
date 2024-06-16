import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from 'src/user/user.module'
import { AuthModule } from 'src/auth/auth.module'
import { ConfigModule } from 'src/config/config.module'
import { TodoModule } from 'src/todo/todo.module'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
