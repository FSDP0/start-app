import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { UserModule } from "@user/user.module";
import { UserService } from "@user/service/user.service";

import { AuthService } from "@auth/service/auth.service";
import { AuthController } from "@auth/controller/auth.controller";
import { jwtConfig } from "@auth/config/jwt.config";

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
