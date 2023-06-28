import React, { createContext } from 'react';
import { IUser } from '../types/AuthTypes';

interface AuthenticationProviderProps {
    children: React.ReactNode;
}

export const AuthenticationContext = createContext<IUser | null>(null);

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const user: IUser | null = JSON.parse(
        localStorage.getItem('blogUser') || 'null'
    );

    return (
        <AuthenticationContext.Provider value={user}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;
