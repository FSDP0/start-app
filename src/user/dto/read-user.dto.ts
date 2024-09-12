import { Role } from "@app/enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";

export class UserReadDto {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: "example@example.com" })
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsBoolean()
  readonly isActive: boolean;

  constructor(id: string, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }
}

export class AdditionalUserInfo {
  @ApiProperty({ example: "password" })
  //   @IsStrongPassword()
  readonly password: string;

  @ApiProperty({ isArray: true, enum: Role, enumName: "role", example: Object.values(Role) })
  @IsEnum(Role, { each: true })
  readonly role: [Role];

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly isActive: boolean;
}
