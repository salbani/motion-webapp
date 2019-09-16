import { IUser } from './user';
import { IMongooseDocument } from './mogooseDocument';


export interface IWave extends IMongooseDocument {
    date?: number;
    name?: string;
    photo?: string;
    items?: IWaveItem[];
    user?: IUser;

}

export interface IWaveItem extends IMongooseDocument {
    date?: number;
    post?: string;
    user?: string;
}