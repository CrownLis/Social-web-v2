export interface IAdress {
  city: string;
}

export interface IUser {
  id: number ;
  firstName: string;
  lastName: string ;
  email: string ;
  avatar: string ;
}

export interface IPost {
  id: number;
  userId?: number;
  text:string
}
