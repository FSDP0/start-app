import { User } from "@user/entity/user.entity";
import { UserSaveDto } from "./save-user.dto";
import { PartialType } from "@nestjs/swagger";
import { UUID } from "crypto";

export class UserUpdateDto {
  public toEntity(uuid: UUID): User {
    const entity = new User();

    return entity;
  }
}
