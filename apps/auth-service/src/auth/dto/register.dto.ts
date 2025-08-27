import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password!: string;

    @IsString()
    @IsNotEmpty()
    readonly name!: string;
}