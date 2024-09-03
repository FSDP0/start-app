import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { HealthCheckModule } from "./healthz/healthz.module";

@Module({
  imports: [DatabaseModule, HealthCheckModule],
  exports: [DatabaseModule]
})
export class GlobalModule {}
