import { IntersectionType } from "@nestjs/swagger";
import { UUID } from "crypto";

import { User } from "@user/entity/user.entity";
import { AdditionalUserInfo, UserReadDto } from "@user/dto/read-user.dto";

export class UserUpdateDto extends IntersectionType(UserReadDto, AdditionalUserInfo) {
  public toEntity(uuid: UUID): User {
    const entity = new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      this.isActive,
      uuid
    );

    return entity;
  }
}
