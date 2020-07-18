import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) return false
    ctx.user = this.validateToken(ctx.headers.authorization)
    return true;
  }

  private async validateToken(auth: string){
    const [bearer, token] = auth.split(' ')
    if (bearer !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    try {
      return await jwt.verify(token, process.env.SECRET_KEY)
    } catch(err){
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}