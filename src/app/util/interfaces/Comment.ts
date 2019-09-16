import { IMongooseDocument } from './mogooseDocument';
export interface IComment extends IMongooseDocument {
    content?: string;
    post?: string;
    user?: string;
    userName?: string;
    votes?: number;
    upvoted?: string[];
    downvoted?: string[];
    comments?: ISubComment[];
    score?: number;
}

export interface ISubComment {
    id?: string;
    content?: string;
    user?: string;
    userName?: string;
    votes?: Number;
    upvoted?: string[];
    downvoted?: string[];
    score?: number;
}