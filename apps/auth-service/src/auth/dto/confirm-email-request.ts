import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailRequestDto {
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com ',
  })
  @IsNotEmpty({ message: 'Email is required.' })
  email!: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Confirmation Code is required.' })
  @IsString({ message: 'Confirmation Code must be a string' })
  confirmationCode!: string;
}