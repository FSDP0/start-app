import { Role } from "@app/enum/role.enum";
import { UserReadDto } from "@user/dto/read-user.dto";
import { UUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("tb_user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userUUID: UUID;

  @Column("varchar", { unique: true })
  userId: string;

  @Column("varchar")
  userName: string;

  @Column("varchar")
  userEmail: string;

  @Column({ type: "varchar", length: 255 })
  userPassword: string;

  @Column({ type: "enum", enum: Role, array: true })
  userRole: [Role];

  @Column("boolean")
  useYN: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  modifiedAt: Date;

  public toDto() {
    const dto = new UserReadDto();

    dto.id = this.userId;
    dto.name = this.userName;
    dto.email = this.userEmail;
    dto.isActive = this.useYN;

    return dto;
  }
}
