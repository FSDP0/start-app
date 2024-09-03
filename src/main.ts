import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { openApiConfig } from "@app/config/swagger.config";

import { AppModule } from "@root/app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
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

  const configService = app.get(ConfigService);

  openApiConfig(app);

  const port = configService.get<number>("PORT");

  await app.listen(port, () => Logger.log(`===== NestJS Server Running at ${port} =====`));
}
bootstrap();
