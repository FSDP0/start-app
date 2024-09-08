import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { HealthCheckController } from "@app/modules/healthz/healthz.controller";
import { ApplicationHealthCheckService } from "./healthz.service";

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [ApplicationHealthCheckService]
})
export class HealthCheckModule {}
