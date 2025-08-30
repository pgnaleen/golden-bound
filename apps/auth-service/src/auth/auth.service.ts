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
  ConfirmUserRequestDto,
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
    const { username, email, password, firstName, familyName, givenName, nickName, gender } = signUpRequestDto;
    if (email) {
      const IsUserExistOnEmail = await this.checkUserExists(email);

      if (IsUserExistOnEmail) {
        throw new BadRequestException(
          'User already exists on given email address',
        );
      }
    }

    const currentUnixTimestamp = Math.floor(Date.now() / 1000).toString();
    const params: SignUpCommandInput = {
      ClientId: this.clientId,
      SecretHash: this.generateSecret(username),
      Username: username,
      Password: password,
      UserAttributes: [
        { Name: 'given_name', Value: givenName },
        { Name: 'family_name', Value: familyName },
        { Name: 'gender', Value: gender },
        { Name: 'nickname', Value: nickName },
        { Name: 'updated_at', Value: currentUnixTimestamp },
        { Name: 'email', Value: email },
        { Name: 'name', Value: firstName + ' ' + familyName },
        // { Name: 'custom:customAttribute', Value: 'customValue' },
      ],
    };

    try {
        const signUpResponse = await this.cognitoClient.send(
          new SignUpCommand(params),
        );

        if (!signUpResponse || !signUpResponse.UserSub) {
          throw new BadRequestException('Failed to create user account');
        }

        return { emailConfirmed: Boolean(signUpResponse.UserConfirmed) };

      } catch (error) {
        console.log('Error during singup:', error);

        if (error && typeof error === 'object' && 'name' in error
          && (error as any).name === 'UsernameExistsException') {
            throw new BadRequestException('User already exists on given username',);
        }
      }

    throw new BadRequestException('Failed to create user account');
  }

  async confirmUser(data: ConfirmUserRequestDto): Promise<IResponse> {
    const params: ConfirmSignUpCommandInput = {
      ClientId: this.clientId,
      SecretHash: this.generateSecret(data.username),
      Username: data.username,
      ConfirmationCode: data.confirmationCode,
    };

    try {
      await this.cognitoClient.send(new ConfirmSignUpCommand(params));
    } catch (error) {
      console.log('Error during confirmUser:', error);
      throw new BadRequestException('Failed to confirm user account');
    }

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
      Username: data.username,
    };

    if (this.clientSecret) {
      params.SecretHash = this.generateSecret(data.username);
    }

    try {
      await this.cognitoClient.send(new ResendConfirmationCodeCommand(params));
    } catch (error) {
      console.log('Error during resendConfirmationCode:', error);
      throw new BadRequestException('Failed to resend confirmation code');
    }

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

    try {
        const { AuthenticationResult: authResult } = await this.cognitoClient.send(
          new InitiateAuthCommand(params),
        );
        return {
          accessToken: authResult?.AccessToken,
          refreshToken: authResult?.RefreshToken,
        };
    }
    catch (error) {
      console.log('Error during signIn:', error);
      throw new BadRequestException('Invalid email or password');
    }

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

      console.log('Error during checkUserExists:', error);
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