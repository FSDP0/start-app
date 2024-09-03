import { ApiProperty } from "@nestjs/swagger";
import { User } from "@user/entity/user.entity";
import { IsBoolean, IsEmail, IsStrongPassword } from "class-validator";

export class UserSaveDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: "example@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isAtive: boolean;

  public toEntity(): User {
    const entity = new User();

    entity.userId = this.id;
    entity.userName = this.name;
    entity.userEmail = this.email;
    entity.userPassword = this.password;
    entity.useYN = this.isAtive;

    return entity;
  }
}
