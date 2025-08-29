import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import configuration from './configuration';
import { generateSecretHash } from '@golden-bound/common';
import { IResponse, IAuthToken } from '@golden-bound/common';
import {
  ConfirmEmailRequestDto,
  ResendConfirmationCodeRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from './dto';

@Injectable()
export class AuthService {
  private readonly cognitoClient = new CognitoIdentityProviderClient({
    region: configuration().aws.cognito.region as string,
    credentials: {
      accessKeyId: configuration().aws.accessKeyId as string,
      secretAccessKey: configuration().aws.secretAccessKey as string,
    },
  });

  private readonly clientId = configuration().aws.cognito.clientId;
  private readonly clientSecret = configuration().aws.cognito.secret;

  async signUp(
    signUpRequestDto: SignUpRequestDto,
  ): Promise<{ emailConfirmed: boolean }> {
    const { username, email, password, firstName, lastName } = signUpRequestDto;
    if (email) {
      const IsUserExistOnEmail = await this.checkUserExists(email);

      if (IsUserExistOnEmail) {
        throw new BadRequestException(
          'User already exists on given email address',
        );
      }
    }

    const params: SignUpCommandInput = {
      ClientId: this.clientId,
      SecretHash: this.generateSecret(username),
      Username: username,
      // Email: email,
      Password: password,
      UserAttributes: [
        { Name: 'given_name', Value: firstName },
        { Name: 'family_name', Value: lastName },
        ...(email ? [{ Name: 'email', Value: email }] : []),
      ],
    };

    const signUpResponse = await this.cognitoClient.send(
      new SignUpCommand(params),
    );

    if (!signUpResponse || !signUpResponse.UserSub) {
      throw new BadRequestException('Failed to create user account');
    }

    return { emailConfirmed: Boolean(signUpResponse.UserConfirmed) };
  }

  async confirmUserEmail(data: ConfirmEmailRequestDto): Promise<IResponse> {
    const params: ConfirmSignUpCommandInput = {
      ClientId: this.clientId,
      SecretHash: this.generateSecret(data.email),
      Username: data.email,
      ConfirmationCode: data.confirmationCode,
    };

    await this.cognitoClient.send(new ConfirmSignUpCommand(params));
    return {
      status: {
        statusCode: HttpStatus.OK,
        message: 'Your account has been successfully confirmed.',
      },
    };
  }

  async resendConfirmationCode(
    data: ResendConfirmationCodeRequestDto,
  ): Promise<IResponse> {
    const params: ResendConfirmationCodeCommandInput = {
      ClientId: this.clientId,
      Username: data.email,
    };

    if (this.clientSecret) {
      params.SecretHash = this.generateSecret(data.email);
    }

    await this.cognitoClient.send(new ResendConfirmationCodeCommand(params));
    return {
      status: {
        statusCode: HttpStatus.OK,
        message: 'Confirmation code has been resent successfully.',
      },
    };
  }

  async signIn(data: SignInRequestDto): Promise<IAuthToken> {
    const { email, password } = data;
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.generateSecret(email),
      },
    };

    const { AuthenticationResult: authResult } = await this.cognitoClient.send(
      new InitiateAuthCommand(params),
    );
    return {
      accessToken: authResult?.AccessToken,
      refreshToken: authResult?.RefreshToken,
    };
  }

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const params = {
        UserPoolId: configuration().aws.cognito.userPoolId,
        Username: email,
      };

      await this.cognitoClient.send(new AdminGetUserCommand(params));
      return true;
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error 
        && (error as any).name === 'UserNotFoundException') {
        return false;
      }
      throw error;
    }
  }

  private generateSecret(identifier: string): string {
    return generateSecretHash(
      identifier,
      this.clientId as string,
      this.clientSecret as string,
    ).toString();
  }
}