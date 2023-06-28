import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useMutation, useQuery } from 'react-query';
import { deleteBlog, fetchBlogs, postBlog } from '../apis/BlogAPI';
import { IBlog } from '../types/BlogTypes';
import BlogCard from '../components/BlogCard';
import Login from './Login';
import CustomModal from '../components/Modal';
import SignUp from './SignUp';
import useAuthentication from '../hooks/useAuthentication';
import Button from '../components/Button';
import { logout } from '../apis/AuthAPI';
import Alert, { SNACKBAR_TYPE } from '../components/Alert';
import BlogDetail from './BlogDetail';
import { Add } from '@carbon/icons-react';
import BlogAddEditForm from './BlogAddEditForm';
import { useSetStatus } from '../context/statusContext';

const Home = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [loginForm, setLoginForm] = useState(false);
    const [signUpForm, setSignUpForm] = useState(false);
    const [blogDetailView, setBlogDetailView] = useState<IBlog | null>(null);
    const [createBlogForm, setCreateBlogForm] = useState(false);
    const loggedIn = useAuthentication();

    const setStatus = useSetStatus();

    const { data, refetch } = useQuery(
        ['users', page, size],
        () => fetchBlogs(page, size),
        { keepPreviousData: true }
    );

    const pageData = data && !_.isEmpty(data.data?.rows) ? data.data?.rows : [];

    const totalCount = (data && data.data?.count) || 0;

    const pageCount = Math.ceil(totalCount / size);

    const { mutate: delBlog } = useMutation(deleteBlog, {
        onSuccess: () => {
            if (blogDetailView) {
                setBlogDetailView(null);
            }
            setStatus(SNACKBAR_TYPE.SUCCESS, 'Blog deleted successfully.');
            refetch();
        },
        onError: () => {
            setStatus(SNACKBAR_TYPE.ERROR, 'Something went wrong');
        },
    });

    const { mutate: updatePublishStatus } = useMutation(postBlog, {
        onSuccess: (data) => {
            const msg = data.data?.published
                ? 'Blog published successfully '
                : 'Blog unpublished successfully';
            setStatus(SNACKBAR_TYPE.SUCCESS, msg);
            refetch();
        },
        onError: () => {
            setStatus(SNACKBAR_TYPE.ERROR, 'Something went wrong');
        },
    });

    const goToPreviousPage = () => {
        setPage(page - 1);
    };

    const goToNextPage = () => {
        setPage(page + 1);
    };

    const goToFirstPage = () => {
        setPage(1);
    };

    const goToLastPage = () => {
        setPage(pageCount);
    };

    const getPaginatedGroup = () => {
        const start = Math.floor((page - 1) / size) * size || 0;
        return new Array(Math.min(size, pageCount - start))
            .fill(0)
            .map((_, index) => start + index + 1);
    };

    const handlePagination = (page: number) => {
        setPage(page);
    };

    const handleEntries = (pagesize: number) => {
        setSize(pagesize);
    };

    const eraseLogin = async () => {
        await logout();
        localStorage.setItem('blogUser', 'null');
        window.location.href = '/';
    };

    useEffect(() => {
        if (!blogDetailView || !createBlogForm) {
            refetch();
        }
    }, [blogDetailView, createBlogForm, refetch]);

    return (
        <div className="container">
            <Alert />
            <CustomModal
                isOpen={createBlogForm}
                handleOnClose={() => setCreateBlogForm(false)}
                handleOnSubmit={() => {
                    return;
                }}
                modalTitle={'Create Blog'}
                showButton={false}
            >
                <BlogAddEditForm handleCloseForm={setCreateBlogForm} />
            </CustomModal>
            <div className="navbar">
                {loggedIn && (
                    <Button
                        label="Add Admin User"
                        handleClick={() =>
                            loggedIn
                                ? setSignUpForm(true)
                                : setSignUpForm(false)
                        }
                    />
                )}
                <Button
                    label={loggedIn ? 'Log Out' : 'Log In'}
                    handleClick={() =>
                        loggedIn ? eraseLogin() : setLoginForm(true)
                    }
                />
            </div>
            {loginForm ? (
                <CustomModal
                    isOpen={loginForm}
                    handleOnClose={() => setLoginForm(false)}
                    handleOnSubmit={() => {
                        return;
                    }}
                    modalTitle={'Login'}
                    showButton={false}
                >
                    <Login setLoginForm={setLoginForm} />
                </CustomModal>
            ) : signUpForm ? (
                <CustomModal
                    isOpen={signUpForm}
                    handleOnClose={() => setSignUpForm(false)}
                    handleOnSubmit={() => {
                        return;
                    }}
                    modalTitle={'Add Admin User'}
                    showButton={false}
                >
                    <SignUp setSignUpForm={setSignUpForm} />
                </CustomModal>
            ) : (
                <></>
            )}
            {blogDetailView ? (
                <BlogDetail
                    blog={blogDetailView}
                    setBlogDetailView={setBlogDetailView}
                    delBlog={delBlog}
                    updatePublishStatus={updatePublishStatus}
                />
            ) : (
                <div>
                    <h3>
                        {loggedIn && (
                            <Add
                                className="add-blog"
                                onClick={() =>
                                    setCreateBlogForm(!createBlogForm)
                                }
                            />
                        )}{' '}
                        Blogs
                    </h3>
                    <div className="row">
                        {pageData.map((blg: IBlog) => (
                            <BlogCard
                                blog={blg}
                                handleClick={setBlogDetailView}
                                key={blg.id}
                                delBlog={delBlog}
                                updatePublishStatus={updatePublishStatus}
                            />
                        ))}
                    </div>
                    {pageData?.length > 0 ? (
                        <div
                            className="paginate"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div className="displayed-page-text">
                                {Math.floor((page - 1) * size) + 1}
                                {' - '}
                                {(page - 1) * size + pageData.length}
                                {' of '}
                                {[totalCount]}
                                {' Blogs'}
                            </div>
                            {pageData.length > 0 && (
                                <ul className="pagination pull-right">
                                    <>
                                        <button
                                            onClick={goToFirstPage}
                                            disabled={page === 1}
                                        >
                                            <i className="fa fa-angle-double-left"></i>
                                        </button>
                                        &nbsp; &nbsp;
                                        <button
                                            onClick={goToPreviousPage}
                                            disabled={page === 1}
                                            style={{
                                                padding: '0px',
                                                marginRight: '10px',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <i
                                                className="fa fa-angle-left"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                        {getPaginatedGroup().map(
                                            (ele: number, i: number) => (
                                                <li
                                                    key={i}
                                                    className={
                                                        ele === page
                                                            ? 'page-item active'
                                                            : 'page-item'
                                                    }
                                                    value={ele}
                                                    onClick={(e) => {
                                                        handlePagination(
                                                            e.currentTarget
                                                                .value
                                                        );
                                                        setPage(
                                                            e.currentTarget
                                                                .value
                                                        );
                                                    }}
                                                >
                                                    <div className="page-link">
                                                        {ele}
                                                    </div>
                                                </li>
                                            )
                                        )}
                                        <button
                                            disabled={page === pageCount}
                                            onClick={goToNextPage}
                                            style={{
                                                padding: '0px',
                                                marginLeft: '10px',
                                                marginRight: '10px',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <i
                                                className="fa fa-angle-right"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                        <button
                                            disabled={page === pageCount}
                                            onClick={goToLastPage}
                                        >
                                            <i
                                                className="fa fa-angle-double-right"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </>
                                </ul>
                            )}

                            <div className="d-flex align-items-center paginate-entries">
                                <label>Showing &nbsp;&nbsp;&nbsp;</label>
                                <select
                                    className="borderless"
                                    value={size}
                                    onChange={(e) => {
                                        handleEntries(Number(e.target.value));
                                        setPage(1);
                                    }}
                                >
                                    <option value="6">6</option>
                                    <option value="12">12</option>
                                    <option value="18">18</option>
                                    <option value="24">24</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div>No Blogs!</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
