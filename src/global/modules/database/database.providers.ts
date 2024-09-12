import { Logger, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

import { DatabaseModule } from "@global/database/database.module";

export const databaseProviders: Provider[] = [
  {
    provide: "DATA_SOURCE",
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const logger = new Logger(DatabaseModule.name);

      try {
        const dataSource = new DataSource(configService.get<DataSourceOptions>("database"));

        await dataSource.initialize();

        logger.log("Database connected successfully");

        return dataSource;
      } catch (error) {
        logger.error("Error connection to database");

        throw error;
      }
    }
  }
];
