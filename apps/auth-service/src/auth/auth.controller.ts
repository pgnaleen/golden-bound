import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  ConfirmEmailRequestDto,
  ResendConfirmationCodeRequestDto,
  SignUpRequestDto,
  SignInRequestDto,
} from './dto';
import { IResponse, IAuthToken } from '@golden-bound/common/src/interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService.name) private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'new user sign-up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully sign up',
  })
  @ApiBody({ type: SignUpRequestDto })
  @HttpCode(HttpStatus.CREATED)
  async userSignUp(
    @Body() userSignUpDto: SignUpRequestDto,
  ): Promise<{ emailConfirmed: boolean }> {
    return this.authService.signUp(userSignUpDto);
  }

  @Post('confirm-email')
  @ApiOperation({ summary: 'Confirm Email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email is verified',
  })
  @ApiBody({ type: ConfirmEmailRequestDto })
  @HttpCode(HttpStatus.OK)
  async ConfirmEmail(
    @Body() confirmAccountDto: ConfirmEmailRequestDto,
  ): Promise<IResponse> {
    return await this.authService.confirmUserEmail(confirmAccountDto);
  }

  @Post('resend-confirmation-code')
  @ApiOperation({ summary: 'Resent Confirmation Code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Confirmation code is resent',
  })
  @ApiBody({ type: ResendConfirmationCodeRequestDto })
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Body() resendConfirmEmailDto: ResendConfirmationCodeRequestDto,
  ): Promise<IResponse> {
    // TODO: Need to check email is already confirmed or not
    // If completed then send a message email already confirmed
    return this.authService.resendConfirmationCode(resendConfirmEmailDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'User sign in' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed in.',
  })
  @ApiBody({ type: SignInRequestDto })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userSignInDto: SignInRequestDto): Promise<IAuthToken> {
    return await this.authService.signIn(userSignInDto);
  }
}