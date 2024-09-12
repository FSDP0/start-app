import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException
} from "@nestjs/common";

import { UserSaveDto } from "@user/dto/save-user.dto";
import { UserRepository } from "@user/repository/user.repository";
import { UserUpdateDto } from "@user/dto/update-user.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async getAll() {
    return await this.userRepository
      .find()
      .then((entities) => entities.map((entity) => entity.toDto()));
  }

  public async getUserById(id: string) {
    return await this.userRepository.findOneBy({ userId: id }).then((entity) => entity.toDto());
  }

  public async createUser(dto: UserSaveDto) {
    return await this.userRepository.existsBy({ userId: dto.id }).then(async (result) => {
      if (result) {
        this.logger.error(`이미 존재하는 사용자 ID 입니다 : ${dto.id}`);

        throw new UnprocessableEntityException("이미 존재하는 사용자 ID 입니다.");
      } else {
        return await this.userRepository.save(dto.toEntity()).then((entity) => entity.toDto());
      }
    });
  }

  public async editUser(dto: UserUpdateDto) {
    return await this.userRepository
      .findOneByOrFail({ userId: dto.id })
      .then(
        async (entity) =>
          await this.userRepository
            .update({ userUUID: entity.userUUID }, dto.toEntity(entity.userUUID))
            .then((result) => result.affected)
      )
      .catch(() => {
        this.logger.error(`해당 사용자를 찾을 수 없습니다 : ${dto.id}`);

        throw new NotFoundException("해당 사용자를 찾을 수 없습니다.");
      });
  }

  public async removeUser(id: string) {
    return await this.userRepository.delete({ userId: id }).then((result) => result.affected);
  }
}
