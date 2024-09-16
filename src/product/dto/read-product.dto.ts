import { ApiProperty } from "@nestjs/swagger";

export class ProductReadDto {
  @ApiProperty({ description: "제품 ID", example: 1 })
  readonly id: number;

  @ApiProperty({ description: "제품 명", example: "Product #1" })
  readonly title: string;

  @ApiProperty({ description: "제품 가격", example: "5.6" })
  readonly price: number;

  @ApiProperty({ description: "제품 카테고리", example: "Media" })
  readonly category: string;

  @ApiProperty({ description: "제품 설명", example: "Sample Product" })
  readonly description: string;

  @ApiProperty({ description: "제품 사진 주소", example: "https://example.com" })
  readonly image: string;

  @ApiProperty({ description: "제품 추가 정보", example: { rate: 4.5, count: 10 } })
  readonly rating: {
    rate: number;
    count: number;
  };
}
