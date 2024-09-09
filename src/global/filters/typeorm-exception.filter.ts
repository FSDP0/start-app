import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { Request, Response } from "express";
import { TypeORMError } from "typeorm";

import { getCurrentDateTime } from "@app/utils/time.util";

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    const message = (exception as TypeORMError).message;
    const code = (exception as any).code;

    const payload: Exception.Message = {
      status,
      code,
      timestamp: getCurrentDateTime(),
      message,
      path: request.url
    };

    return response.status(status).json(payload);
  }
}
