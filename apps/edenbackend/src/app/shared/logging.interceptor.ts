import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const statusCode = response.statusCode;

    const url = request.url;

    const now = Date.now();


    return next.handle().pipe(
      tap(() => Logger.log(`${method} ${statusCode}: ${url}. Took ${Date.now() - now}ms`, context.getClass().name,false))
    );
  }

}
