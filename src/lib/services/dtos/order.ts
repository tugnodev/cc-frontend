import { type articleDto } from "./article.js";

export enum OrderStatus {
  VALIDEE = "validee",
  ATTENTE = "en attente",
  ANNULEE = "annulee",
}

type Items = {
  article: articleDto;
  quantity: number;
};

export interface createOrderDto {
  items: {
    articleId: string;
    quantity: number;
  }[];
  buyerId: string;
  sellerId: string;
}

export interface updateOrderDto {
  id: string;
  items?: Items[];
  buyerId?: string;
  sellerId?: string;
  status?: OrderStatus;
}

export interface orderDto {
  id: string;
  items: Items[];
  buyerId: string;
  sellerId: string;
  status: OrderStatus | string;
  createdAt: Date;
  updatedAt: Date;
}
