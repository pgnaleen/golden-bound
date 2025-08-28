import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResendConfirmationCodeRequestDto {
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email is required.' })
  email!: string;
}