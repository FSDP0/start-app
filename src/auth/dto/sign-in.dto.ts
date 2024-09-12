import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ example: "exampleId" })
  readonly id: string;

  @ApiProperty({ example: "examplePwd" })
  readonly password: string;
}
