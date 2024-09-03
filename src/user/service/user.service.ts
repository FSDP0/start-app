import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserRepository } from "@user/repository/user.repository";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {}

  public async getAll() {
    return await this.userRepository
      .find()
      .then((entities) => entities.map((entity) => entity.toDto()));
  }

  public async getUserById(id: string) {
    return await this.userRepository.findOneBy({ userId: id }).then((entity) => entity.toDto());
  }

  public async createUser(dto: UserSaveDto) {
    const salt = this.configService.get<string>("hash.salt");

    dto.password = bcrypt.hashSync(dto.password, +salt);

    return await this.userRepository.save(dto.toEntity());
  }

  public async editUser() {}

  public async removeUser() {}
}
