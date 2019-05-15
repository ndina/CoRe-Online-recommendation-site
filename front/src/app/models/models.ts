export interface ICategory{
    id:number,
    name:string,
    created_at:any,
    description:string
}
export interface IProduct{
    id:number,
    name:string,
    image:string,
    description:string
}
export interface IAuthResponse{
    token: string;
    username:string;
}

export interface IUser {
    id: number;
    password: string;
    username: string;
    name: string;
    surname: string;
    email: string;
}

export interface IComment {
    id: number;
    name:string;
    content: string;
    rating: number;
    product:IProduct;
    created_by: IUser;
}