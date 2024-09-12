import { IntersectionType } from "@nestjs/swagger";
import { UUID } from "crypto";
import bcrypt from "bcrypt";

import { User } from "@user/entity/user.entity";
import { AdditionalUserInfo, UserReadDto } from "@user/dto/read-user.dto";

export class UserUpdateDto extends IntersectionType(UserReadDto, AdditionalUserInfo) {
  public toEntity(uuid: UUID): User {
    const hashedPassword = bcrypt.hashSync(this.password, +process.env.SALT);

    const entity = new User(
      this.id,
      this.name,
      this.email,
      hashedPassword,
      this.role,
      this.isActive,
      uuid
    );

    return entity;
  }
}
