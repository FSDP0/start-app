import Exception from "@app/types/exception";
import { getCurrentDateTime } from "@app/utils/time.util";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();

    const payload: Exception.Message = {
      status: status,
      timestamp: getCurrentDateTime(),
      path: request.url
    };

    response.status(status).json(payload);
  }
}
