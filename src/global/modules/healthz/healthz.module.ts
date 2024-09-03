import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { HealthCheckController } from "@app/modules/healthz/healthz.controller";

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController]
})
export class HealthCheckModule {}
