import { BoardReadDto } from "@board/dto/read-board.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_board")
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column({ name: "title" })
  boardTitle: string;

  @Column({ name: "description" })
  boardDescription: string;

  public toDto(): BoardReadDto {
    const dto = new BoardReadDto();

    dto.id = this.boardId;
    dto.title = this.boardTitle;
    dto.description = this.boardDescription;

    return dto;
  }
}
