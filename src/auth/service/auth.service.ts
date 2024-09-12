import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Response } from "express";
import bcrypt from "bcrypt";

import { SignInDto } from "@auth/dto/sign-in.dto";
import { JwtPayload } from "@auth/interfaces/jwt-payload.interface";
import { User } from "@user/entity/user.entity";
import { UserRepository } from "@user/repository/user.repository";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async signIn(res: Response, dto: SignInDto) {
    const user = await this.validateUser(dto);

    const payload: JwtPayload = {
      sub: user.id,
      userName: user.name,
      userRole: user.role
    };

    const accessToken = await this.jwtService.signAsync(payload);

    res.setHeader("access_token", accessToken);

    res.send({
      success: true,
      access_token: accessToken
    });
  }

  public async validateUser(dto: SignInDto) {
    const user: User = await this.userRepository
      .findOneByOrFail({
        userId: dto.id
      })
      .catch(() => {
        this.logger.error(`해당 사용자가 존재하지 않습니다 : ${dto.id}`);

        throw new NotFoundException("해당 사용자가 존재하지 않습니다.");
      });

    const isMatch: boolean = await bcrypt.compare(dto.password, user.userPassword);

    if (!isMatch) {
      this.logger.error(`계정 정보가 불일치합니다 : ${dto.id}`);

      throw new UnauthorizedException("계정 정보가 불일치합니다.");
    }

    return user.toDto();
  }
}
