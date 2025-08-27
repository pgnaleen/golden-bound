import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChallengeDto } from './dto/challenge.dto';

@Controller('auth')
export class AuthController {
    
        constructor(
       @Inject(AuthService.name) private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // console.log(loginDto)
        return await this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string) {
        return this.authService.forgotPassword(email);
    }

    @Post('challenge')
    async respondToChallenge(@Body() challengeDto: ChallengeDto) {
        return this.authService.respondToChallenge(challengeDto);
    }
}