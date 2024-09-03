import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { jwtConfig } from "@global/jwt/jwt.config";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [ConfigService],
      useFactory: async (configSerivce: ConfigService) => configSerivce.get<object>("jwt")
    })
  ],
  exports: [JwtModule]
})
export class JwtAuthModule {}
