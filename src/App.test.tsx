import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthenticationProvider from './context/authenticationContext';
import { StatusProvider } from './context/statusContext';

afterEach(() => {
    cleanup();
});

test('renders App component', () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <StatusProvider>
                    <App />
                </StatusProvider>
            </AuthenticationProvider>
        </QueryClientProvider>
    );
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
});
