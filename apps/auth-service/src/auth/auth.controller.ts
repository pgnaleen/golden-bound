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
  ConfirmUserRequestDto,
  ResendConfirmationCodeRequestDto,
  SignUpRequestDto,
  SignInRequestDto,
} from './dto';
import { IResponse, IAuthToken } from '@golden-bound/common';

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
  @ApiBody({ type: ConfirmUserRequestDto })
  @HttpCode(HttpStatus.OK)
  async ConfirmEmail(
    @Body() confirmAccountDto: ConfirmUserRequestDto,
  ): Promise<IResponse> {
    return await this.authService.confirmUser(confirmAccountDto);
  }

  @Post('resend-confirmation-code')
  @ApiOperation({ summary: 'Resent Confirmation Code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Confirmation code has been resent',
  })
  @ApiBody({ type: ResendConfirmationCodeRequestDto })
  @HttpCode(HttpStatus.OK)
  async resendEmailCode(
    @Body() resendConfirmEmailDto: ResendConfirmationCodeRequestDto,
  ): Promise<IResponse> {
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