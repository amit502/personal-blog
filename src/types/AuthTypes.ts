export interface ILogin {
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    joinDate: string;
    accessToken: string | null;
    refreshToken: string | null;
}

export interface IUserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
