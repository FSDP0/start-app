import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ example: "exampleId" })
  id: string;

  @ApiProperty({ example: "examplePwd" })
  password: string;
}
