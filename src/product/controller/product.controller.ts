import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { ProductSaveDto } from "@product/dto/save-product.dto";
import { ProductUpdateDto } from "@product/dto/update-product.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@app/guards/auth.guard";
import { RoleGuard } from "@app/guards/role.guard";
import { Roles } from "@app/decorators/role.decorator";
import { Role } from "@app/enum/role.enum";

@ApiTags("[004]. Product REST API")
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "모든 제품 정보 조회" })
  @Roles(Role.USER)
  @Get()
  public findAll() {
    return this.productService.getAll();
  }

  @Roles(Role.USER)
  @ApiOperation({ summary: "특정 번호 제품 정보 조회" })
  @Get(":id")
  public findOne(@Param("id") id: number) {
    return this.productService.getOne(id);
  }

  @ApiOperation({ summary: "새로운 제품 정보 등록" })
  @Roles(Role.USER, Role.ADMIN)
  @Post()
  public save(@Body() dto: ProductSaveDto) {
    return this.productService.create(dto);
  }

  @ApiOperation({ summary: "기존 제품 정보 갱신" })
  @Roles(Role.USER, Role.ADMIN)
  @Put(":id")
  public update(@Param("id") id: number, @Body() dto: ProductUpdateDto) {
    return this.productService.edit(id, dto);
  }

  @ApiOperation({ summary: "기존 제품 정보 삭제" })
  @Roles(Role.USER, Role.ADMIN)
  @Delete(":id")
  public delete(@Param("id") id: number) {
    return this.productService.remove(id);
  }
}
