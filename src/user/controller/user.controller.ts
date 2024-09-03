import { Roles } from "@app/decorators/role.decorator";
import { Role } from "@app/enum/role.enum";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserService } from "@user/service/user.service";

@ApiTags("[002]. User REST API")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
