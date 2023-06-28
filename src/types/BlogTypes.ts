import { IUser } from './AuthTypes';

export interface IBlog {
    id?: number;
    title: string;
    subtitle: string;
    content: string;
    published: boolean;
    UserId: number;
    User?: IUser;
    createdAt?: string;
    updatedAt?: string;
}
