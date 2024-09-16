import { OmitType, PartialType } from "@nestjs/swagger";
import { ProductReadDto } from "./read-product.dto";

export class ProductUpdateDto extends PartialType(OmitType(ProductReadDto, ["id"] as const)) {}
