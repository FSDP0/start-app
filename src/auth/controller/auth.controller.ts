import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Request, Response } from "express";

import { Public } from "@app/decorators/public.decorator";

import { SignInDto } from "@auth/dto/sign-in.dto";
import { AuthGuard } from "@auth/guards/auth.guard";
import { AuthService } from "@auth/service/auth.service";

@ApiTags("[003]. Auth REST API")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "사용자 로그인 " })
  @Public()
  @Post("login")
  public login(@Res() res: Response, @Body() dto: SignInDto) {
    return this.authService.signIn(res, dto);
  }

  @ApiOperation({ summary: "사용자 프로필" })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("profile")
  public profile(@Req() req: Request) {
    return req["user"];
  }
}
