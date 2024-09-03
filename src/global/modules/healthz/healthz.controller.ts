import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";

@ApiTags("[999]. System HealtchCheck EndPoints")
@Controller({ path: "system", version: VERSION_NEUTRAL })
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly indicator: TypeOrmHealthIndicator
  ) {}

  @HealthCheck()
  @Get("database")
  public healthCheckDatbase() {
    return this.healthCheckService.check([() => this.indicator.pingCheck("database")]);
  }
}
