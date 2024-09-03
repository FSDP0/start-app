import { Module } from "@nestjs/common";

import { DatabaseModule } from "@global/database/database.module";
import { HealthCheckModule } from "@global/healthz/healthz.module";

@Module({
  imports: [DatabaseModule, HealthCheckModule],
  exports: [DatabaseModule]
})
export class GlobalModule {}
