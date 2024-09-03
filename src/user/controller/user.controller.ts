import { Roles } from "@app/decorators/role.decorator";
import { Role } from "@app/enum/role.enum";
import { AuthGuard } from "@app/guards/auth.guard";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserService } from "@user/service/user.service";

@ApiTags("[002]. User REST API")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("test")
  public test() {
    return "test";
  }

  @Roles(Role.ADMIN)
  @Get()
  public findAll() {
    return this.userService.getAll();
  }

  @Get(":id")
  public findUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  public saveUser(@Body() dto: UserSaveDto) {
    return this.userService.createUser(dto);
  }

  @Put(":id")
  public updateUser() {}

  @Delete(":id")
  public deleteUser() {}
}
