import { IMongooseDocument } from './mogooseDocument';
export interface IMedia extends IMongooseDocument{
    user?: string;
    date?: string;
    name?: string;
    link?: string;
    type?: string;
    tags?: string[];
}