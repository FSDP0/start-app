import { SignInDto } from "@auth/dto/sign-in.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@user/service/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async signIn(dto: SignInDto) {
    const user = await this.userService.getUserById(dto.userId);

    if (user.password !== dto.userPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
