import { Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
