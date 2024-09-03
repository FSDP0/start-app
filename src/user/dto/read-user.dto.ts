import { ApiProperty } from "@nestjs/swagger";

export class UserReadDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;
}
