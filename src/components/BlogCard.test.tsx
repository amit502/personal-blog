import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import BlogCard from './BlogCard';
import { IBlog } from '../types/BlogTypes';

afterEach(() => {
    cleanup();
});

let selectedBlog = null;

const blog = {
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
};

const handleClick = (blog: IBlog) => {
    selectedBlog = blog;
};

test('Blog Card renders correctly', () => {
    render(
        <BlogCard
            blog={blog}
            handleClick={handleClick}
            delBlog={() => {}}
            updatePublishStatus={() => {}}
        />
    );
    const cardElement = screen.getByTestId('blog-card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent('Lorem ipsum12');
});

test('Blog Card has correct title text', () => {
    render(
        <BlogCard
            blog={blog}
            handleClick={handleClick}
            delBlog={() => {}}
            updatePublishStatus={() => {}}
        />
    );
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('Lorem ipsum12');
});

test('Blog Card has correct content text', () => {
    render(
        <BlogCard
            blog={blog}
            handleClick={handleClick}
            delBlog={() => {}}
            updatePublishStatus={() => {}}
        />
    );
    const contentElement = screen.getByTestId('card-content');
    expect(contentElement).toHaveTextContent(
        'Lorem ipsum dolor sit amet, consectetur'
    );
});
