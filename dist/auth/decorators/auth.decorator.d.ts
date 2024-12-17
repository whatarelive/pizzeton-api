import { ValidRoles } from '../interfaces/valid_roles';
export declare const META_ROLES = "role";
export declare function Auth(...roles: ValidRoles[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
