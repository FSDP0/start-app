import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ProductHttpService } from "./service/product-http.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
      baseURL: "https://fakestoreapi.com"
    })
  ],
  providers: [
    {
      provide: ProductHttpService,
      useExisting: HttpService
    }
  ],
  exports: [ProductHttpService]
})
export class ProductHttpModule {}
