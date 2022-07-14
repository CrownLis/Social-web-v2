export interface IAdress {
  city: string;
}

export interface IUser {
  loading?: boolean | undefined;
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
}

export interface IPost {
  id: number;
  userId?: number;
  text:string
}
