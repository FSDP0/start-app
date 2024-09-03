import { Module } from "@nestjs/common";

import { UserModule } from "@user/user.module";
import { UserRepository } from "@user/repository/user.repository";

import { AuthService } from "@auth/service/auth.service";
import { AuthController } from "@auth/controller/auth.controller";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
