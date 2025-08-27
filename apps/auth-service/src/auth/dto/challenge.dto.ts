import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum ChallengeNameType {
    SMS_MFA = 'SMS_MFA',
    NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'
}

export class ChallengeDto {
    @IsEnum(ChallengeNameType)
    @IsNotEmpty()
    readonly challengeName!: ChallengeNameType;

    @IsString()
    @IsNotEmpty()
    readonly challengeResponse!: string;

    @IsString()
    @IsOptional()
    readonly session?: string;
}