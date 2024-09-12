import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";

import { DECORATOR_CONSTANTS } from "@app/constants/decorator.constant";

const {
  PUBLIC: { IS_PUBLIC_KEY }
} = DECORATOR_CONSTANTS;

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn(`토큰이 존재하지 않습니다. : [${request.ip}] - ${request.url}`);

      throw new UnauthorizedException("접근이 거부되었습니다.");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("jwt.secret")
      });

      request["user"] = payload;
    } catch {
      this.logger.warn(`유효하지 않은 토큰값입니다 : [${request.ip}] '${token}'`);

      throw new UnauthorizedException("접근이 거부되었습니다.");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.authorization) {
      this.logger.warn(`인증받지 않은 사용자의 요청입니다 : [${request.ip}] -> ${request.url}`);

      throw new UnauthorizedException("접근이 거부되었습니다.");
    }

    const [type, token] = request.headers.authorization.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
