import { SignInDto } from "@auth/dto/sign-in.dto";
import { JwtPayload } from "@auth/interfaces/jwt-payload.interface";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@user/entity/user.entity";
import { UserRepository } from "@user/repository/user.repository";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async signIn(res: Response, dto: SignInDto) {
    const user: User = await this.userRepository
      .findOneByOrFail({ userId: dto.id })
      .then((entity) => entity)
      .catch(() => {
        throw new NotFoundException();
      });

    if (user.userPassword !== dto.password) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { sub: user.userId, username: user.userName, role: user.userRole };

    const accessToken = await this.jwtService.signAsync(payload);

    res.setHeader("access_token", accessToken);

    res.send({
      success: true,
      access_token: accessToken
    });
  }
}
