import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { postBlog } from '../apis/BlogAPI';
import { useSetStatus } from '../context/statusContext';
import { IBlog } from '../types/BlogTypes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GlobalAlert, { SNACKBAR_TYPE } from '../components/Alert';
import Button from '../components/Button';
import useAuthentication from '../hooks/useAuthentication';
import { TextField } from '@mui/material';

interface BlogAddEditFormProps {
    blog?: IBlog;
    handleCloseForm: Function;
    setBlogEditView?: Function;
}

const BlogAddEditForm = ({
    blog,
    handleCloseForm,
    setBlogEditView,
}: BlogAddEditFormProps) => {
    const user = useAuthentication();
    const {
        mutate: addUpdateBlog,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useMutation(postBlog, {
        onSuccess: (data) =>
            setBlogEditView ? setBlogEditView(data.data) : {},
    });

    const setStatus = useSetStatus();

    const initialValues: any = blog
        ? {
              title: blog.title,
              subtitle: blog.subtitle,
              content: blog.content,
          }
        : {
              title: '',
              subtitle: '',
              content: '',
          };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            subtitle: Yup.string(),
            content: Yup.string().required('Content is required'),
        }),
        onSubmit: (values: IBlog) => {
            let val = blog?.id
                ? {
                      ...blog,
                      title: values.title,
                      subtitle: values.subtitle,
                      content: values.content,
                  }
                : {
                      ...values,
                      published: false,
                      UserId: user?.id,
                  };
            addUpdateBlog(val);
        },
    });

    useEffect(() => {
        if (isSuccess && !isLoading && !isError && !error) {
            setStatus(SNACKBAR_TYPE.SUCCESS, 'Blog posted successfully.');
            formik.resetForm();
            handleCloseForm(false);
        } else if (!isLoading && isError && error) {
            setStatus(
                SNACKBAR_TYPE.ERROR,
                (error as any)?.response?.data?.message ||
                    'Something went wrong'
            );
        }
        // eslint-disable-next-line
    }, [isLoading, isError, error, isSuccess]);

    return (
        <div className="form-wrapper">
            <GlobalAlert />
            <div className="form-group">
                <label>Title</label>
                <input
                    className={
                        formik.errors &&
                        formik.errors?.title &&
                        formik.touched &&
                        formik.touched?.title
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    name="title"
                    type="text"
                    value={formik.values?.title || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.title &&
                    formik.touched &&
                    formik.touched?.title && (
                        <div className="invalid-feedback">
                            {(formik.errors?.title as string) || ''}
                        </div>
                    )}
            </div>
            <div className="form-group">
                <label>Subtitle</label>
                <input
                    className={
                        formik.errors &&
                        formik.errors?.subtitle &&
                        formik.touched &&
                        formik.touched?.subtitle
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    name="subtitle"
                    type="text"
                    value={formik.values?.subtitle || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.subtitle &&
                    formik.touched &&
                    formik.touched?.subtitle && (
                        <div className="invalid-feedback">
                            {(formik.errors?.subtitle as string) || ''}
                        </div>
                    )}
            </div>
            <div className="form-group">
                <label>Content</label>
                <TextField
                    className={
                        formik.errors &&
                        formik.errors?.content &&
                        formik.touched &&
                        formik.touched?.content
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    id="outlined-basic"
                    variant="outlined"
                    multiline
                    name="content"
                    value={formik.values?.content || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.content &&
                    formik.touched &&
                    formik.touched?.content && (
                        <div className="invalid-feedback">
                            {(formik.errors?.content as string) || ''}
                        </div>
                    )}
            </div>
            <Button
                type={'submit'}
                label="Submit"
                handleClick={(e: any) => formik.handleSubmit(e)}
            />
        </div>
    );
};

export default BlogAddEditForm;
