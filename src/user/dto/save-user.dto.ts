import { IntersectionType } from "@nestjs/swagger";
import { User } from "@user/entity/user.entity";
import { AdditionalUserInfo, UserReadDto } from "./read-user.dto";

export class UserSaveDto extends IntersectionType(UserReadDto, AdditionalUserInfo) {
  public toEntity(): User {
    const entity = new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.role,
      this.isActive
    );

    return entity;
  }
}
