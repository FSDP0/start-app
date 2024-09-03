import { Module } from "@nestjs/common";

import { UserService } from "@user/service/user.service";
import { UserController } from "@user/controller/user.controller";
import { UserRepository } from "@user/repository/user.repository";
import { ConfigModule } from "@nestjs/config";
import { hashConfig } from "./config/hash.config";

@Module({
  imports: [ConfigModule.forFeature(hashConfig)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
