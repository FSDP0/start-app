import { Inject, Injectable } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator
} from "@nestjs/terminus";
import { DataSource } from "typeorm";

@Injectable()
export class ApplicationHealthCheckService {
  constructor(
    @Inject("DATA_SOURCE")
    private readonly dataSource: DataSource,
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly distHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator
  ) {}

  private readonly KILO_BYTE_UNIT: number = 1024;
  private readonly MEGA_BYTE_UNIT: number = 1024 * 1024;
  private readonly GIGA_BYTE_UNIT: number = 1024 * 1024 * 1024;

  // 0 ~ 1
  private readonly DISK_PATH: string = "C:\\";
  private readonly DISK_THRESHOLD_PERCENTAGE: number = 0.99;

  public getDatabaseHealthz() {
    return () => this.typeOrmHealthIndicator.pingCheck("database", { connection: this.dataSource });
  }

  public getDiskAllocateHealthz() {
    return () =>
      this.distHealthIndicator.checkStorage("disk", {
        path: this.DISK_PATH,
        thresholdPercent: this.DISK_THRESHOLD_PERCENTAGE
      });
  }

  public getMemoryAllocateHealthz() {
    return () => this.memoryHealthIndicator.checkHeap("memory", 250 * this.GIGA_BYTE_UNIT);
  }
}
