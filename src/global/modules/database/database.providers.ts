import { Logger, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

export const databaseProviders: Provider[] = [
  {
    provide: "DATA_SOURCE",
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      try {
        const dataSource = new DataSource(configService.get<DataSourceOptions>("database"));

        await dataSource.initialize();

        Logger.log("Database connected successfully");

        return dataSource;
      } catch (error) {
        Logger.error("Error connection to database");

        throw error;
      }
    }
  }
];
