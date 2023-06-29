import React from 'react';
import {
    render,
    screen,
    cleanup,
    act,
    waitFor,
    fireEvent,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';
import AuthenticationProvider from '../context/authenticationContext';
import { StatusProvider } from '../context/statusContext';
import axios from 'axios';
import { IBlog } from '../types/BlogTypes';

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});

test('renders Home component', () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
                <StatusProvider>
                    <Home />
                </StatusProvider>
            </AuthenticationProvider>
        </QueryClientProvider>
    );
    const homeElement = screen.getByTestId('home');
    expect(homeElement).toBeInTheDocument();
});

// jest.mock('axios');
// const blogs = [
//     {
//         title: 'Lorem ipsum12',
//         subtitle: 'Lorem ipsum dolor sit amet',
//         content: 'Lorem ipsum dolor sit amet, consectetur',
//         published: false,
//         UserId: 1,
//         User: {
//             firstName: 'Amit',
//             lastName: 'Patel',
//             email: 'patelamyt@gmail.com',
//         },
//         createdAt: '2023-06-28T22:01:01Z',
//         updatedAt: '2023-06-28T22:01:01Z',
//     },
//     {
//         title: 'Lorem ipsum14',
//         subtitle: 'Lorem ipsum dolor sit amet',
//         content: 'Lorem ipsum dolor sit amet, consectetur',
//         published: false,
//         UserId: 1,
//         User: {
//             firstName: 'Arun',
//             lastName: 'Patel',
//             email: 'patelarun@gmail.com',
//         },
//         createdAt: '2023-06-28T22:01:01Z',
//         updatedAt: '2023-06-28T22:01:01Z',
//     },
// ];

// test('renders correct text on no blogs', async () => {
//     const queryClient = new QueryClient();
//     const pageData: Array<IBlog> | [] = [];
//     (axios.get as jest.Mock).mockResolvedValueOnce(pageData);
//     render(
//         <QueryClientProvider client={queryClient}>
//             <AuthenticationProvider>
//                 <StatusProvider>
//                     <Home />
//                 </StatusProvider>
//             </AuthenticationProvider>
//         </QueryClientProvider>
//     );

//     const homeElement = await waitFor(() => screen.getByTestId('home'));
//     //console.log('HHHHHHHH', homeElement);
//     await waitFor(() => expect(homeElement).toHaveTextContent('No Blogs!'));
// });
