import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [{provide: AuthService.name, useClass: AuthService}],
    exports: [],
})
export class AuthModule {}