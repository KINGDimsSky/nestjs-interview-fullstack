import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Tentukan Status Code
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Ambil Pesan Error
    let message = 'Internal Server Error';
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'object' ? (res['message'] || res['error']) : res;
    }

    // WAJIB: Selalu berbentuk Page sesuai Requirement Poin 5
    return response.status(status).render('error', {
      title: `Error ${status}`,
      status,
      message: Array.isArray(message) ? message[0] : message, // Ambil pesan pertama jika array
    });
  }
}