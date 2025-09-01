import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResendConfirmationCodeRequestDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
  })
  @IsNotEmpty({ message: 'Username is required.' })
  username!: string;
}