import { Module } from "@nestjs/common";

import { BoardController } from "@board/controller/board.controller";
import { BoardService } from "@board/service/board.service";
import { BoardRepository } from "@board/repository/board.repository";

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository]
})
export class BoardModule {}
