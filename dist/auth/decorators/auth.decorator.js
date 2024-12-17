"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META_ROLES = void 0;
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_role_guard_1 = require("../guards/user-role.guard");
exports.META_ROLES = 'role';
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.META_ROLES, roles), (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), user_role_guard_1.UserRoleGuard));
}
//# sourceMappingURL=auth.decorator.js.map