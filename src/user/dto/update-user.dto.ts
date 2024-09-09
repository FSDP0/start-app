import { IntersectionType } from "@nestjs/swagger";
import { UUID } from "crypto";

import { User } from "@user/entity/user.entity";
import { AdditionalUserInfo, UserReadDto } from "@user/dto/read-user.dto";

export class UserUpdateDto extends IntersectionType(UserReadDto, AdditionalUserInfo) {
  public toEntity(uuid: UUID): User {
    const entity = new User();

    entity.userUUID = uuid;
    entity.userId = this.id;
    entity.userName = this.name;
    entity.userEmail = this.email;
    entity.userPassword = this.password;
    entity.useYN = this.isActive;
    entity.userRole = this.role;

    return entity;
  }
}
