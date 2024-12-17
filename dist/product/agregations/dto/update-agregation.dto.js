"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAgregationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_agregation_dto_1 = require("./create-agregation.dto");
class UpdateAgregationDto extends (0, mapped_types_1.PartialType)(create_agregation_dto_1.CreateAgregationDto) {
}
exports.UpdateAgregationDto = UpdateAgregationDto;
//# sourceMappingURL=update-agregation.dto.js.map