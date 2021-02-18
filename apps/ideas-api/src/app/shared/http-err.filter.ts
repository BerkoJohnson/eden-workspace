import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
// import {} from ''

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    // eslint-disable-next-line @typescript-eslint/ban-types

    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      status: statusCode,
      message:
        statusCode !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message || null
          : 'Internal Server error',
    };


    if(statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter',
    );
    response.status(statusCode).json(errorResponse);
  }
}

