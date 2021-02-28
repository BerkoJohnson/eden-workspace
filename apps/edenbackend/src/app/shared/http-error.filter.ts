import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
     const  context = host.switchToHttp();
     const request: Request = context.getRequest();
     const response:Response = context.getResponse();
     console.log(exception)

     const statusCode = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

     const errorResponse = {
       timestamp: new Date().toISOString(),
       path: request.url,
       method: request.method,
       status: statusCode,
       message: statusCode !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.message || null: 'Internal Server Error',
     };

     if(statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
       console.log(exception);
     }

     Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse, null, 2), 'ExceptionFilter');

     response.status(statusCode).json(errorResponse);
    }

}
