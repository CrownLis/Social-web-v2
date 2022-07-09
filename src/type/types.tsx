export interface IAdress {
  city: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: IAdress;
  phone: number;
}

export interface IPost {
  id: number;
  userId?: number;
  title?: string;
  body: string;
}
