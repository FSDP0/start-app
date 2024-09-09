import { HttpStatus } from "@nestjs/common";

declare namespace Exception {
  interface Message {
    status: HttpStatus;
    code?: string;
    timestamp: string | Date;
    message?: string;
    path?: string;
  }
}

export as namespace Exception;
export = Exception;
