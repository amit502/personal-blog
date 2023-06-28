import React, { useContext, useState } from 'react';

const StatusTypeContext = React.createContext<any>(null);
const StatusMessageContext = React.createContext<any>(null);
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

export function StatusProvider({ children }: any) {
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
