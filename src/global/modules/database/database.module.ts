import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { databaseConfig } from "@global/database/database.config";
import { databaseProviders } from "./database.providers";

@Global()
@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {}
