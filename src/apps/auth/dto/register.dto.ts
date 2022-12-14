import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString({ message: 'Please insert a name.' })
  readonly name: string;

  @ApiProperty()
  @IsString({ message: 'Please insert an email.' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Please insert a password.' })
  readonly password: string;
}
