import { IMongooseDocument } from './mogooseDocument';
export interface IUser extends IMongooseDocument {
    token?: string,
    email?: string,
    name?: string
    bio?: string;
    avatar?: string;
    landscape?: string;
    homeCountry?: string;
    UILanguage?: string;
    languages?: string[];
    followers?: string[];
    following?: string[];
    bookmarks?: string;
    homepage?: string;
    isGoogle?: boolean;
    interests?: string[];
    local: IUserInfo;
    google: IUserInfo;
    facebook: IUserInfo;
    twitter: IUserInfo;
    wordpress: IUserInfo;
}

export interface IUserInfo {
    email: string;
}