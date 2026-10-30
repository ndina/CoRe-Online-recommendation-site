export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface IProduct {
  id: number;
  name: string;
  image: string;
  description: string;
  product_list?: ICategory;
}

export interface IAuthResponse {
  token: string;
  username: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  name?: string;
  surname?: string;
}

export interface IComment {
  id: number;
  name: string;
  content: string;
  rating: number;
  product: number;
  created_by: number | null;
}
