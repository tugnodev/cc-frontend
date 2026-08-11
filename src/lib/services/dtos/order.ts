import { type articleDto } from "./article.js";

export enum OrderStatus {
  VALIDEE = "valide",
  ATTENTE = "attente",
  ANNULEE = "annulee",
}

type Items = {
  articleId: string;
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

export type Order = {
  id: string;
  items: {
    article: articleDto;
    quantity: number;
  }[];
  buyerId: string;
  sellerId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
