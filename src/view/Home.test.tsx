import React from 'react';
import { render, screen, cleanup, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';
import AuthenticationProvider from '../context/authenticationContext';
import { StatusProvider } from '../context/statusContext';
import { IBlog } from '../types/BlogTypes';
import * as service from '../apis/BlogAPI';

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
});

jest.mock('axios');
jest.mock('../apis/BlogAPI', () => ({
    fetchBlogs: jest.fn().mockResolvedValue(blogs),
}));

const blogs = [
    {
        id: 1,
        title: 'Lorem ipsum12',
        subtitle: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        published: false,
        UserId: 1,
        User: {
            firstName: 'Amit',
            lastName: 'Patel',
            email: 'patelamyt@gmail.com',
        },
        createdAt: '2023-06-28T22:01:01Z',
        updatedAt: '2023-06-28T22:01:01Z',
    },
    {
        id: 2,
        title: 'Lorem ipsum14',
        subtitle: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        published: false,
        UserId: 1,
        User: {
            firstName: 'Arun',
            lastName: 'Patel',
            email: 'patelarun@gmail.com',
        },
        createdAt: '2023-06-28T22:01:01Z',
        updatedAt: '2023-06-28T22:01:01Z',
    },
];

test('fetchBlogs fetches correct data objects', async () => {
    const pageData: Array<IBlog> | [] = blogs;

    act(() => (service.fetchBlogs as jest.Mock).mockResolvedValue(pageData));
    const data = await act(() => service.fetchBlogs(1, 2));
    await waitFor(() => expect((data as any).length).toEqual(2));
});

test('fetchBlogs fetches empty data', async () => {
    const pageData: Array<IBlog> | [] = [];

    act(() => (service.fetchBlogs as jest.Mock).mockResolvedValue(pageData));
    const data = await act(() => service.fetchBlogs(1, 2));
    await waitFor(() => expect((data as any).length).toEqual(0));
});

test('renders Home component', async () => {
    const queryClient = new QueryClient();
    act(() =>
        render(
            <QueryClientProvider client={queryClient}>
                <AuthenticationProvider>
                    <StatusProvider>
                        <Home />
                    </StatusProvider>
                </AuthenticationProvider>
            </QueryClientProvider>
        )
    );
    const homeElement = await waitFor(() => screen.getByTestId('home'));
    expect(homeElement).toBeInTheDocument();
});

const data = {
    data: {
        rows: blogs,
        count: 2,
    },
};

test('renders 2 card components on non-empty data with 2 objects', async () => {
    const queryClient = new QueryClient();
    act(() => (service.fetchBlogs as jest.Mock).mockResolvedValue(data)); // non-empty data
    await act(() => service.fetchBlogs(1, 2));
    await act(() =>
        render(
            <QueryClientProvider client={queryClient}>
                <AuthenticationProvider>
                    <StatusProvider>
                        <Home />
                    </StatusProvider>
                </AuthenticationProvider>
            </QueryClientProvider>
        )
    );
    const cardElements = await waitFor(() =>
        screen.getAllByTestId('blog-card')
    );
    const firstTitle = await waitFor(() => screen.getByText('Lorem ipsum12'));
    await waitFor(() => expect(cardElements.length).toEqual(2));
    await waitFor(() => expect(firstTitle).toContainHTML('h4'));
});

test('renders no blogs message when data is empty', async () => {
    const queryClient = new QueryClient();
    act(() => (service.fetchBlogs as jest.Mock).mockResolvedValue([])); // empty data
    await act(() => service.fetchBlogs(1, 2));
    await act(() =>
        render(
            <QueryClientProvider client={queryClient}>
                <AuthenticationProvider>
                    <StatusProvider>
                        <Home />
                    </StatusProvider>
                </AuthenticationProvider>
            </QueryClientProvider>
        )
    );
    const noBlog = await waitFor(() => screen.findByText('No Blogs!'));
    await waitFor(() => expect(noBlog).toContainHTML('div'));
});
