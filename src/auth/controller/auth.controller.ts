import { SignInDto } from "@auth/dto/sign-in.dto";
import { AuthGuard } from "@auth/guards/auth.guard";
import { AuthService } from "@auth/service/auth.service";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@ApiTags("[003]. Auth REST API")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "사용자 로그인 " })
  @Post("login")
  public login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @ApiOperation({ summary: "사용자 프로필" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("profile")
  public profile(@Req() req: Request) {
    return req["user"];
  }
}
