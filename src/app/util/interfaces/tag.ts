import { IMongooseDocument } from './mogooseDocument';
export interface ITag extends IMongooseDocument{
    tag: string;
}