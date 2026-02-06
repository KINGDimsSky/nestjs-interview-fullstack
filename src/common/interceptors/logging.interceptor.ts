import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditLoggingInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, body } = request;

    return next.handle().pipe(
      tap(async (data) => {
        if (['POST', 'PATCH', 'DELETE'].includes(method)) {
          await this.prisma.activityLog.create({
            data: {
              adminId: user?.userId || null,
              action: method,
              entity: url.split('/')[1],
              entityId: data?.id || 0,
              newData: JSON.stringify(body),
              createdAt: new Date(),
            },
          });
        }
      }),
    );
  }
}