import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true })],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}