import type{ UUID } from "crypto";
import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsUUID } from "class-validator";
import { CreateProductDTO } from "./create-product.dto";

export class UpdateProductDTO extends PartialType(CreateProductDTO) {

    @IsUUID()
    @IsOptional()
    readonly id?: UUID;
}