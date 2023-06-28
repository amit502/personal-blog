import React, { useState } from 'react';
import { IBlog } from '../types/BlogTypes';
import { ArrowLeft, Edit, TrashCan } from '@carbon/icons-react';
import CustomModal from '../components/Modal';
import BlogAddEditForm from './BlogAddEditForm';
import Button from '../components/Button';
import useAuthentication from '../hooks/useAuthentication';

interface BlogDetailProps {
    blog: IBlog;
    setBlogDetailView: (arg0: IBlog | null) => void;
    delBlog: (arg0: IBlog) => void;
    updatePublishStatus: (arg0: IBlog) => void;
}

const BlogDetail = ({
    blog,
    setBlogDetailView,
    delBlog,
    updatePublishStatus,
}: BlogDetailProps) => {
    const [editBlog, setEditBlog] = useState(false);
    const loggedIn = useAuthentication();
    return (
        <React.Fragment>
            <CustomModal
                isOpen={editBlog}
                handleOnClose={() => setEditBlog(false)}
                handleOnSubmit={() => {
                    return;
                }}
                modalTitle={'Edit Blog'}
                showButton={false}
            >
                <BlogAddEditForm
                    handleCloseForm={setEditBlog}
                    blog={blog}
                    setBlogEditView={setBlogDetailView}
                />
            </CustomModal>
            <div className="blog-detail">
                <div className="detail-header">
                    <div className="left-nav">
                        <ArrowLeft
                            className="arrow-left"
                            onClick={() => setBlogDetailView(null)}
                        />
                    </div>
                    {loggedIn && (
                        <div className="action-btns">
                            <Edit
                                className="edit"
                                onClick={() => setEditBlog(!editBlog)}
                            />
                            <TrashCan
                                className="delete"
                                onClick={() => delBlog(blog)}
                            />
                        </div>
                    )}
                </div>
                <div className="detail-content">
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
                                    label={
                                        blog.published ? 'Unpublish' : 'Publish'
                                    }
                                    handleClick={() => {
                                        const updBlog = blog;
                                        updBlog.published = !blog.published;
                                        updatePublishStatus(updBlog);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="card-content">{blog.content}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BlogDetail;
