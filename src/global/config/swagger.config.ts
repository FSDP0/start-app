import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { SWAGGER_CONSTANTS as SWAGGER } from "@app/constants/swagger.constant";

export const openApiConfig = (app: INestApplication) => {
  const configs = new DocumentBuilder()
    .setTitle(SWAGGER.TITLE)
    .setDescription(SWAGGER.DESCRIPTION)
    .setVersion(SWAGGER.VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configs);

  SwaggerModule.setup("swagger-ui", app, document);
};
