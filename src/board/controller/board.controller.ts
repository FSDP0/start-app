import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Roles } from "@app/decorators/role.decorator";
import { Role } from "@app/enum/role.enum";
import { RoleGuard } from "@app/guards/role.guard";
import { AuthGuard } from "@app/guards/auth.guard";

import { BoardService } from "@board/service/board.service";
import { BoardSaveDto } from "@board/dto/save-board.dto";
import { BoardUpdateDto } from "@board/dto/update-board.dto";

@ApiTags("[001]. Board REST API ")
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller("boards")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: "모든 게시글 조회" })
  @Roles(Role.USER)
  @Get()
  public findAll() {
    return this.boardService.getAll();
  }

  @ApiOperation({ summary: "특정 번호 게시글 조회" })
  @Roles(Role.USER)
  @Get(":id")
  public findBoardById(@Param("id") id: number) {
    return this.boardService.getBoardById(id);
  }

  @ApiOperation({ summary: "새로운 게시글 등록" })
  @Roles(Role.USER)
  @Post()
  public saveBoard(@Body() dto: BoardSaveDto) {
    return this.boardService.createBoard(dto);
  }

  @ApiOperation({ summary: "기존 게시글 갱신" })
  @Roles(Role.USER)
  @Put(":id")
  public updateBoard(@Param("id") id: number, @Body() dto: BoardUpdateDto) {
    return this.boardService.editBoard(id, dto);
  }

  @ApiOperation({ summary: "기존 게시글 삭제" })
  @Roles(Role.USER)
  @Delete(":id")
  public removeBoard(@Param("id") id: number) {
    return this.boardService.removeBoard(id);
  }
}
