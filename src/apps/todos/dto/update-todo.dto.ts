import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

export class UpdateTodoDto {
  @ValidateIf((object, value) => value !== null && value !== undefined)
  @ApiProperty()
  @IsString({ message: 'Please insert a title.' })
  readonly title: string;

  @ValidateIf((object, value) => value !== null && value !== undefined)
  @ApiProperty()
  @IsString({ message: 'Please insert the content.' })
  readonly content: string;
}
