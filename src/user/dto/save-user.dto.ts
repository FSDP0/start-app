import { IntersectionType } from "@nestjs/swagger";
import { User } from "@user/entity/user.entity";
import { AdditionalUserInfo, UserReadDto } from "./read-user.dto";

export class UserSaveDto extends IntersectionType(UserReadDto, AdditionalUserInfo) {
  public toEntity(): User {
    const entity = new User();

    entity.userId = this.id;
    entity.userName = this.name;
    entity.userEmail = this.email;
    entity.userPassword = this.password;
    entity.useYN = this.isActive;
    entity.userRole = this.role;

    return entity;
  }
}
