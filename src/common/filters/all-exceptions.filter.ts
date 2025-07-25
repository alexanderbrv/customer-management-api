import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from '@src/my-logger/my-logger.service';
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@generated/prisma/runtime/library';

type MyResponseObject = {
  success: boolean;
  code: number;
  path: string;
  response: string | object;
  timestamp: string;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const MyResponseObject: MyResponseObject = {
      success: false,
      code: 500,
      path: request.path,
      response: '',
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof NotFoundException) {
      MyResponseObject.code = exception.getStatus();
      MyResponseObject.response = 'Not Found';
    } else if (exception instanceof HttpException) {
      MyResponseObject.code = exception.getStatus();
      MyResponseObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      MyResponseObject.code = 422;
      MyResponseObject.response = exception.message.replaceAll(/\n/g, '');
    } else if (exception instanceof PrismaClientKnownRequestError) {
      MyResponseObject.code = 422;
      MyResponseObject.response = exception.message.replaceAll(/\n/g, '');
    } else {
      MyResponseObject.code = HttpStatus.INTERNAL_SERVER_ERROR;
      MyResponseObject.response = 'Internal Server Error';
    }

    response.status(MyResponseObject.code).json(MyResponseObject);

    this.logger.error(MyResponseObject.response);

    super.catch(exception, host);
  }
}
