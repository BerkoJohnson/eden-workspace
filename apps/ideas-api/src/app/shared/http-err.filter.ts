import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
// import {} from ''

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    console.log(JSON.stringify(exception));
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const msgObj = exception.getResponse() as {};

    const errorResponse = {
      ...msgObj,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter',
    );
    response.status(statusCode).json(errorResponse);
  }
}
