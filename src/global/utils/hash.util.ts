import bcrypt from "bcrypt";

export const hashing = async (value: string) => bcrypt.hashSync(value, process.env.SALT);

export const isMatch = async (value: string, hash: string) => bcrypt.compareSync(value, hash);
