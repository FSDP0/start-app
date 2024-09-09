import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { Public } from "@app/decorators/public.decorator";
import { Roles } from "@app/decorators/role.decorator";
import { Role } from "@app/enum/role.enum";
import { AuthGuard } from "@app/guards/auth.guard";

import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserService } from "@user/service/user.service";
import { Request } from "express";
import { RoleGuard } from "@app/guards/role.guard";

@ApiTags("[002]. User REST API")
@UseGuards(AuthGuard, RoleGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get("test")
  public test() {
    return "test";
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Get()
  public findAll(@Req() req: Request) {
    console.log(req["user"]);

    return this.userService.getAll();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Get(":id")
  public findUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @Public()
  @Post()
  public saveUser(@Body() dto: UserSaveDto) {
    return this.userService.createUser(dto);
  }

  @ApiBearerAuth()
  @Put(":id")
  public updateUser() {}

  @ApiBearerAuth()
  @Delete(":id")
  public deleteUser(@Param("id") id: string) {
    return this.userService.removeUser(id);
  }
}
