
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

export interface IConversation {
  id: number;
  status: string;
  lastMessage: IMessage;
  participants?: IUser[]
}

export interface IMessage {
  id: number;
  conversationId: number;
  text: string;
  authorId:number;
  author: IUser
}