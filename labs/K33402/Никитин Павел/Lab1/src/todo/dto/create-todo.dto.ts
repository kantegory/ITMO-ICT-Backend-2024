import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @ApiProperty({
    description: 'Todo title',
  })
  @IsString({})
  @IsNotEmpty({})
  title: string

  @ApiProperty({
    description: 'Todo description',
  })
  @IsOptional({})
  @IsString({ message: 'Password field is required' })
  description?: string
}
