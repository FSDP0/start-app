import { Injectable } from "@nestjs/common";
import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserRepository } from "@user/repository/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAll() {
    return await this.userRepository
      .find()
      .then((entities) => entities.map((entity) => entity.toDto()));
  }

  public async getUserById(id: string) {
    return await this.userRepository.findOneBy({ userId: id }).then((entity) => {
      return { ...entity.toDto(), password: entity.userPassword };
    });
  }

  public async createUser(dto: UserSaveDto) {
    return await this.userRepository.save(dto.toEntity());
  }

  public async editUser() {}

  public async removeUser() {}
}
