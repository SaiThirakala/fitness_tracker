import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class RequireJsonGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method.toUpperCase();

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      const ct = String(req.headers['content-type'] ?? '').toLowerCase();
      if (!ct.startsWith('application/json')) {
        throw new UnsupportedMediaTypeException(
          'Content-Type must be application/json for POST/PUT/PATCH requests.',
        );
      }
    }
    return true;
  }
}
