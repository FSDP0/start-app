import { OmitType } from "@nestjs/swagger";
import { BoardReadDto } from "./read-board.dto";
import { Board } from "@board/entity/board.entity";

export class BoardUpdateDto extends OmitType(BoardReadDto, ["id"] as const) {
  public toEntity(id: number): Board {
    const entity = new Board();

    entity.boardId = id;
    entity.boardTitle = this.title;
    entity.boardDescription = this.description;

    return entity;
  }
}
