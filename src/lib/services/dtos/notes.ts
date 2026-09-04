export interface createNotesDto {
  number: number;
  userId: string;
  articleId: string;
}

export interface updateNotesDto {
  id: string;
  number: number;
  userId: string;
  articleId: string;
}