import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @ApiProperty({
    description: 'First Name of the user',
    example: 'John',
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a valid string' })
  firstName!: string;

  @ApiProperty({
    description: 'Last Name of the user',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a valid string' })
  lastName!: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'securePassword123',
    minLength: 8,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}