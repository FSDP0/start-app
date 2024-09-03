import { Board } from "@board/entity/board.entity";
import { OmitType } from "@nestjs/swagger";
import { BoardReadDto } from "./read-board.dto";

export class BoardSaveDto extends OmitType(BoardReadDto, ["id"] as const) {
  public toEntity(): Board {
    const entity = new Board();

    entity.boardTitle = this.title;
    entity.boardDescription = this.description;

    return entity;
  }
}
