import { SetMetadata } from "@nestjs/common";
import { DECORATOR_CONSTANTS } from "@app/constants/decorator.constant";

const {
  PUBLIC: { IS_PUBLIC_KEY }
} = DECORATOR_CONSTANTS;

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
