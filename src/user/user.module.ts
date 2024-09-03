import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { hashConfig } from "@user/config/hash.config";

import { UserService } from "@user/service/user.service";
import { UserController } from "@user/controller/user.controller";
import { UserRepository } from "@user/repository/user.repository";

@Module({
  imports: [ConfigModule.forFeature(hashConfig)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
