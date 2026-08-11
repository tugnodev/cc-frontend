export type item = {
  articleId: string;
  image: string;
  name: string;
  price: number;
};

export interface cartDto {
  userId: string;
  items: item[];
  id: string;
}
