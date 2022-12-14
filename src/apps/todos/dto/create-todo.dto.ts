import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString({ message: 'Please insert a title.' })
  readonly title: string;

  @ApiProperty()
  @IsString({ message: 'Please insert the content.' })
  readonly content: string;
}
