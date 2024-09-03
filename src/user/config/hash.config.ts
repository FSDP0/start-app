import bcrypt from "bcrypt";
import { registerAs } from "@nestjs/config";

export const hashConfig = registerAs("hash", () => ({
  salt: process.env.SALT ?? bcrypt.genSaltSync()
}));
