import { Module } from "@nestjs/common";

import { UserService } from "@user/service/user.service";
import { UserController } from "@user/controller/user.controller";
import { UserRepository } from "@user/repository/user.repository";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
