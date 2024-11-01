export interface ApplicationError {
  code: string;
  name: string;
  message: string;
  metadata?: { [key: string]: unknown };
}

export type User = {
  userId: string
  username: string
}