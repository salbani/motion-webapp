import { IPost } from './post';
import { IUser } from './user';
import { IMongooseDocument } from './mogooseDocument';
export interface IFeed extends IMongooseDocument{
    posts?: { post: string | IPost , score: number }[];
    ref?: string | IUser;
}