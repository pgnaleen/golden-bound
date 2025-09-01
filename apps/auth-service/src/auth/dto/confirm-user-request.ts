import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmUserRequestDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsNotEmpty({ message: 'Username is required.' })
  username!: string;

  @ApiProperty({
    description: 'The confirmation code sent to the user email',
    example: '123456',
  })
  @IsNotEmpty({ message: 'Confirmation Code is required.' })
  @IsString({ message: 'Confirmation Code must be a string' })
  confirmationCode!: string;
}