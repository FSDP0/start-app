import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userPassword: string;
}
