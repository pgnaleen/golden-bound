import { Injectable, UnauthorizedException } from '@nestjs/common';
import { 
    InitiateAuthCommand,
    SignUpCommand,
    ForgotPasswordCommand,
    RespondToAuthChallengeCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './cognito.client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChallengeDto } from './dto/challenge.dto';

@Injectable()
export class AuthService {
    
    async login(loginDto: LoginDto) {
      
        try {
            const command = new InitiateAuthCommand({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: process.env.COGNITO_CLIENT_ID,
                AuthParameters: {
                    USERNAME: loginDto.email,
                    PASSWORD: loginDto.password,
                }
            });

            const response = await cognitoClient.send(command);
            return response;
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async register(registerDto: RegisterDto) {
        const command = new SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: registerDto.email,
            Password: registerDto.password,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: registerDto.name,
                }
            ]
        });

        return await cognitoClient.send(command);
    }

    async forgotPassword(email: string) {
        const command = new ForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            Username: email
        });

        return await cognitoClient.send(command);
    }

    async respondToChallenge(challengeDto: ChallengeDto) {
        const command = new RespondToAuthChallengeCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            ChallengeName: challengeDto.challengeName,
            Session: challengeDto.session,
            ChallengeResponses: {
                ANSWER: challengeDto.challengeResponse
            }
        });

        return await cognitoClient.send(command);
    }
}