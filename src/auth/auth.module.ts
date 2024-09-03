import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UserModule } from "@user/user.module";

import { AuthController } from "@auth/controller/auth.controller";
import { AuthService } from "@auth/service/auth.service";
import { jwtConfig } from "@auth/config/jwt.config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { UserService } from "@user/service/user.service";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => configSerivce.get<JwtModuleOptions>("jwt")
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
