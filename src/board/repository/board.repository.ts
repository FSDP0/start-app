import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { Board } from "@board/entity/board.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
}
