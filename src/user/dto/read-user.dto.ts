import { Role } from "@app/enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";

export class UserReadDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: "example@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class AdditionalUserInfo {
  @ApiProperty({ example: "password" })
  //   @IsStrongPassword()
  password: string;

  @ApiProperty({ isArray: true, enum: Role, enumName: "role", example: Object.values(Role) })
  @IsEnum(Role, { each: true })
  role: [Role];

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
