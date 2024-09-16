import { Module } from "@nestjs/common";
import { ProductService } from "./service/product.service";
import { ProductController } from "./controller/product.controller";
import { ProductHttpModule } from "./product-http.module";

@Module({
  imports: [ProductHttpModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
