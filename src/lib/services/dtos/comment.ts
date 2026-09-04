export interface createCommentDto {
  articleId: string;
  userId: string;
  comment: string;
}

export interface updateCommentDto {
  id: string;
  articleId: string;
  userId: string;
  comment?: string;
}

export interface commentDto {
  id: number;
  articleId: string;
  author: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}