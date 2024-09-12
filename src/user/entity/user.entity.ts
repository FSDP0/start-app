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
  readonly userUUID: UUID;

  @Column("varchar", { unique: true })
  readonly userId: string;

  @Column("varchar")
  readonly userName: string;

  @Column("varchar")
  readonly userEmail: string;

  @Column({ type: "varchar", length: 255 })
  readonly userPassword: string;

  @Column({ type: "enum", enum: Role, array: true })
  readonly userRole: [Role];

  @Column("boolean")
  readonly useYN: boolean;

  @CreateDateColumn({ type: "timestamp" })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  readonly modifiedAt: Date;

  constructor(
    userId: string,
    userName: string,
    userEmail: string,
    userPassword: string,
    userRole: [Role],
    useYN: boolean,
    userUUID?: UUID
  ) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userRole = userRole;
    this.useYN = useYN;
    this.userUUID = userUUID;
  }

  public toDto() {
    return new UserReadDto(this.userId, this.userName, this.userEmail, this.useYN);
  }
}
