import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { ApplicationHealthCheckService } from "./healthz.service";

@ApiTags("[999]. System HealtchCheck EndPoints")
@Controller({ path: "system", version: VERSION_NEUTRAL })
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly appliactionHealthCheckService: ApplicationHealthCheckService
  ) {}

  @Get("healthz")
  public getApplicationHealthz(): string {
    return "OK";
  }

  @HealthCheck()
  @Get("status")
  public healthCheckDatbase() {
    return this.healthCheckService.check([
      this.appliactionHealthCheckService.getDatabaseHealthz(),
      this.appliactionHealthCheckService.getDiskAllocateHealthz(),
      this.appliactionHealthCheckService.getMemoryAllocateHealthz()
    ]);
  }
}
