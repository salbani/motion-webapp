import { IUser } from './user';
import { IMongooseDocument } from './mogooseDocument';

export interface IPost extends IMongooseDocument{
    user?: IUser;
    title?: string;
    photo?: string;
    date?: number;
    summary?: string;
    content?: string;
    tags?: string[];
    votes?: number;
    upvoted?: string[];
    downvoted?: string[];
    comments?: string[];
    score?: number;
}
