import React from 'react';
import { IBlog } from '../types/BlogTypes';
import { TrashCan } from '@carbon/icons-react';
import useAuthentication from '../hooks/useAuthentication';
import Button from './Button';

interface BlogCardProps {
    blog: IBlog;
    handleClick: (arg0: IBlog) => void;
    delBlog: (arg0: IBlog) => void;
    updatePublishStatus: (arg0: IBlog) => void;
}

const BlogCard = ({
    blog,
    handleClick,
    delBlog,
    updatePublishStatus,
}: BlogCardProps) => {
    const loggedIn = useAuthentication();
    return (
        <div className="col-lg-4 col-md-6 col-12">
            <div
                className="card"
                onClick={() => handleClick(blog)}
                data-testid="blog-card"
            >
                <div className="card-top">
                    <div>
                        <div className="card-title">
                            <h4 className="mb-0">{blog.title}</h4>
                        </div>
                        <div className="card-author">
                            <span>
                                {blog.User?.firstName +
                                    ' ' +
                                    blog.User?.lastName}
                                {blog.createdAt
                                    ? ' | ' +
                                      new Date(
                                          blog.createdAt || ''
                                      ).toLocaleDateString()
                                    : ''}
                            </span>
                        </div>
                        <div className="card-subtitle">
                            <span>{blog.subtitle}</span>
                        </div>
                    </div>
                    {loggedIn && (
                        <div className="card-tools">
                            <Button
                                label={blog.published ? 'Unpublish' : 'Publish'}
                                handleClick={(e) => {
                                    e.stopPropagation();
                                    const updBlog = blog;
                                    updBlog.published = !blog.published;
                                    updatePublishStatus(updBlog);
                                }}
                            />
                            <TrashCan
                                className="delete"
                                onClick={(e) => {
                                    delBlog(blog);
                                    e.stopPropagation();
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="card-content">
                    <p data-testid="card-content">
                        {blog.content?.substring(0, 200)}
                        {blog.content?.length > 200 ? '...' : ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
