import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";

import { ProductReadDto } from "@product/dto/read-product.dto";
import { ProductSaveDto } from "@product/dto/save-product.dto";
import { ProductUpdateDto } from "@product/dto/update-product.dto";

import { ProductHttpService } from "@product/service/product-http.service";

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly httpService: ProductHttpService) {}

  public async getAll() {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductReadDto[]>("products").pipe(
        catchError((error: AxiosError) => {
          this.logger.error("서비스 호출 중 오류가 발생했습니다.", error.response.data);

          throw new InternalServerErrorException("서비스 호출 중 오류가 발생했습니다.");
        })
      )
    );

    return data;
  }

  public async getOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductReadDto>(`products/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error("서비스 호출 중 오류가 발생했습니다.", error.response.data);

          throw new InternalServerErrorException("서비스 호출 중 오류가 발생했습니다.");
        })
      )
    );

    return data;
  }

  public async create(dto: ProductSaveDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<ProductReadDto>(`products`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error("서비스 호출 중 오류가 발생했습니다.", error.response.data);

          throw new InternalServerErrorException("서비스 호출 중 오류가 발생했습니다.");
        })
      )
    );

    return data;
  }

  public async edit(id: number, dto: ProductUpdateDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<ProductReadDto>(`products/${id}`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error("서비스 호출 중 오류가 발생했습니다.", error.response.data);

          throw new InternalServerErrorException("서비스 호출 중 오류가 발생했습니다.");
        })
      )
    );

    return data;
  }

  public async remove(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductReadDto>(`products/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error("서비스 호출 중 오류가 발생했습니다.", error.response.data);

          throw new InternalServerErrorException("서비스 호출 중 오류가 발생했습니다.");
        })
      )
    );

    return data;
  }
}
