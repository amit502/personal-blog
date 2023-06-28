import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    HttpRequestInterceptor,
    HttpResponseInterceptor,
} from './HttpInterceptor';
import AuthenticationProvider from './context/authenticationContext';
import { StatusProvider } from './context/statusContext';

const queryClient = new QueryClient();
// eslint-disable-next-line
const requestInterceptor = HttpRequestInterceptor;
// eslint-disable-next-line
const responseInterceptor = HttpResponseInterceptor;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <StatusProvider>
                    <App />
                </StatusProvider>
            </AuthenticationProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
