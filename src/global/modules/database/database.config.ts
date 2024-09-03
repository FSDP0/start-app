import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const databaseConfig = registerAs(
  "database",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    host: process.env.DATASOURCE_HOSTNAME,
    port: +process.env.DATASOURCE_PORT,
    database: process.env.DATASOURCE_TARGET_DATABASE,
    username: process.env.DATASOURCE_USERNAME,
    password: process.env.DATASOURCE_PASSWORD,
    synchronize: process.env.NODE_ENV !== "production",
    entities: [join(__dirname, "../../../**/*.entity{.ts,.js}")],
    logging: process.env.NODE_ENV === "development" || process.env.DATASOURCE_QUERY_LOGGING === "1"
  })
);
