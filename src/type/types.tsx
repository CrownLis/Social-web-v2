export interface IAdress {
    city:string
}

export interface IUser {
    id: number;
    name:string;
    email:string
    address: IAdress;
    phone:number
  }

 export interface IPosts {
    id:number;
    userId?:number;
    title?:string;
    body:string;
    onClick: (id:number) => void
  }
