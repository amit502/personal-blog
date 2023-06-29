import { IUser, IUserCreate } from './AuthTypes';

export interface IBlog {
    id?: number;
    title: string;
    subtitle: string;
    content: string;
    published: boolean;
    UserId: number;
    User?: IUserCreate;
    createdAt?: string;
    updatedAt?: string;
}
