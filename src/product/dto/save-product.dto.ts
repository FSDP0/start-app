import { OmitType } from "@nestjs/swagger";
import { ProductReadDto } from "@product/dto/read-product.dto";

export class ProductSaveDto extends OmitType(ProductReadDto, ["id"] as const) {}
