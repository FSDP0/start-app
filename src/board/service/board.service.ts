import { Injectable } from "@nestjs/common";

import { BoardSaveDto } from "@board/dto/save-board.dto";

import { BoardRepository } from "@board/repository/board.repository";
import { BoardUpdateDto } from "@board/dto/update-board.dto";
import { Board } from "@board/entity/board.entity";
import { In } from "typeorm";

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  public async getAll() {
    return await this.boardRepository
      .find()
      .then((entities) => entities.map((entity) => entity.toDto()));
  }

  public async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({ boardId: id }).then((entity) => entity.toDto());
  }

  public async getBoardByIds(ids: number[]) {
    return await this.boardRepository
      .findBy({
        boardId: In(ids)
      })
      .then((entities) => entities.map((entity) => entity.toDto()));
  }

  public async createBoard(dto: BoardSaveDto) {
    return await this.boardRepository.manager
      .transaction(async (manager) => await manager.save(dto.toEntity()))
      .then((entity) => entity.toDto());
  }

  public async editBoard(id: number, dto: BoardUpdateDto) {
    return await this.boardRepository.manager.transaction(
      async (manager) => await manager.update(Board, { boardId: id }, dto.toEntity(id))
    );
  }

  public async removeBoard(id: number) {
    return await this.boardRepository.manager.transaction(
      async (manager) => await manager.delete(Board, { boardId: id })
    );
  }
}
