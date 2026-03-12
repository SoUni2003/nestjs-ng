import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    console.error('Prisma Error:', {
      code: exception.code,
      meta: exception.meta,
      message: exception.message,
    });

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const meta = exception.meta as unknown as { target?: string[] };
        const target = meta?.target;

        response.status(status).json({
          statusCode: status,
          message:
            target && Array.isArray(target)
              ? `Unique constraint failed on field: ${target.join(', ')}`
              : `Unique constraint failed: ${message}`,
          error: 'Conflict',
        });
        break;
      }
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST;
        const meta = exception.meta as unknown as {
          field_name?: string;
          driverAdapterError?: {
            cause?: {
              constraint?: {
                index?: string;
              };
            };
          };
        };

        let fieldName = meta?.field_name;

        if (!fieldName && meta?.driverAdapterError?.cause?.constraint?.index) {
          const indexName = meta.driverAdapterError.cause.constraint.index;
          const parts = indexName.split('_');
          if (parts.length > 2 && parts[parts.length - 1] === 'fkey') {
            fieldName = parts.slice(1, -1).join('_');
          }
        }

        response.status(status).json({
          statusCode: status,
          message: fieldName
            ? `Invalid reference value for field: ${fieldName}`
            : `Invalid reference. The related record does not exist.`,
          error: 'Bad Request',
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: 'Record not found',
        });
        break;
      }
      default:
        // default 500 error code
        console.error(exception);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: message,
        });
        break;
    }
  }
}
