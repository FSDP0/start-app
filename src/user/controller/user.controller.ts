import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Public } from "@app/decorators/public.decorator";
import { Roles } from "@app/decorators/role.decorator";
import { Role } from "@app/enum/role.enum";
import { AuthGuard } from "@app/guards/auth.guard";
import { RoleGuard } from "@app/guards/role.guard";

import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserService } from "@user/service/user.service";
import { UserUpdateDto } from "@user/dto/update-user.dto";

@ApiTags("[002]. User REST API")
@UseGuards(AuthGuard, RoleGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "모든 사용자 조회" })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Get()
  public findAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: "특정 사용자 조회" })
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @Get(":id")
  public findUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: "새로운 사용자 정보 등록" })
  @Public()
  @Post()
  public saveUser(@Body() dto: UserSaveDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({ summary: "기존 사용자 정보 갱신" })
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @Put(":id")
  public updateUser(@Body() dto: UserUpdateDto) {
    return this.userService.editUser(dto);
  }

  @ApiOperation({ summary: "기존 사용자 정보 삭제" })
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @Delete(":id")
  public deleteUser(@Param("id") id: string) {
    return this.userService.removeUser(id);
  }
}
