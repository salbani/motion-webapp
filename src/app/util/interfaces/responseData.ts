export interface IResponseData<T>{
    type: number;
    message: string;
    error?: any;
    data?: T;
}