import { UserReadDto } from "@user/dto/read-user.dto";
import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userUUID: UUID;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  userPassword: string;

  @Column()
  useYN: boolean;

  public toDto() {
    const dto = new UserReadDto();

    dto.id = this.userId;
    dto.name = this.userName;
    dto.email = this.userEmail;
    dto.isActive = this.useYN;

    return dto;
  }
}
