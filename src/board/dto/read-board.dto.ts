import { ApiProperty } from "@nestjs/swagger";

export class BoardReadDto {
  @ApiProperty({ description: "게시글 제목", example: 1 })
  id: number;

  @ApiProperty({ description: "게시글 제목", example: "TEST_TITLE" })
  title: string;

  @ApiProperty({ description: "게시글 설명", example: "TEST_DESCRIPTION" })
  description: string;
}
