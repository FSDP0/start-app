import { Module } from "@nestjs/common";

import { DatabaseModule } from "@global/database/database.module";
import { HealthCheckModule } from "@global/healthz/healthz.module";
import { JwtAuthModule } from "./jwt/jwt-auth.module";

@Module({
  imports: [DatabaseModule, HealthCheckModule, JwtAuthModule],
  exports: [DatabaseModule]
})
export class GlobalModule {}
