import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestApplication, NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import compression from "compression";

import { openApiConfig } from "@app/config/swagger.config";

import { AppModule } from "@root/app.module";

async function bootstrap() {
  const logger = new Logger(NestApplication.name);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api", { exclude: ["system/(.*)"] });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1"
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  // ! Gateways 또는 Hybrid Application에서 설정 불가
  // ! Provider 사용 권고
  // app.useGlobalFilters(new TypeOrmExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.use(compression());

  const configService = app.get(ConfigService);

  openApiConfig(app);

  const port = configService.get<number>("PORT");

  await app.listen(port, () => logger.log(`===== NestJS Server Running at ${port} =====`));
}
bootstrap();
