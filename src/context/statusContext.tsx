import React, { useContext, useState } from 'react';

const StatusTypeContext = React.createContext<string | null>(null);
const StatusMessageContext = React.createContext<string | null>(null);
// eslint-disable-next-line
const SetStatusContext = React.createContext<any>(null);

export function useStatusType() {
    return useContext(StatusTypeContext);
}

export function useStatusMessage() {
    return useContext(StatusMessageContext);
}

export function useSetStatus() {
    return useContext(SetStatusContext);
}

interface StatusProviderProps {
    children: React.ReactNode;
}

export function StatusProvider({ children }: StatusProviderProps) {
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    function setStatus(type: string, message: string) {
        setType(type);
        setMessage(message);
    }

    return (
        <StatusTypeContext.Provider value={type}>
            <StatusMessageContext.Provider value={message}>
                <SetStatusContext.Provider value={setStatus}>
                    {children}
                </SetStatusContext.Provider>
            </StatusMessageContext.Provider>
        </StatusTypeContext.Provider>
    );
}
