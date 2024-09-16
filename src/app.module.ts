import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";

import { GlobalModule } from "@global/global.module";
import { UserModule } from "@user/user.module";
import { BoardModule } from "@board/board.module";
import { AuthModule } from "@auth/auth.module";
import { ProductModule } from "@product/product.module";

const ENV_DIR_PATH = `${process.cwd()}/env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${ENV_DIR_PATH}/.env`,
        `${ENV_DIR_PATH}/.env.${process.env.NODE_ENV ?? "local"}`
      ],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("local", "development", "production").default("development"),
        PORT: Joi.number().port().default(3000)
      })
    }),
    GlobalModule,
    UserModule,
    BoardModule,
    AuthModule,
    ProductModule
  ],
  providers: []
})
export class AppModule {}
