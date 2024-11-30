import type{ UUID } from "node:crypto";

export interface IProduct {
    id: UUID
    title: string;
    subtitle: string;
    category: string;
    imgUrl: string;
    price: number;
}