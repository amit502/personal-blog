import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { postBlog } from '../apis/BlogAPI';
import { useSetStatus } from '../context/statusContext';
import { IBlog } from '../types/BlogTypes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GlobalAlert, { SNACKBAR_TYPE } from '../components/Alert';
import Button from '../components/Button';
import useAuthentication from '../hooks/useAuthentication';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

interface BlogAddEditFormProps {
    blog?: IBlog;
    handleCloseForm: (arg0: boolean) => void;
    setBlogEditView?: (arg0: IBlog) => void;
}

const BlogAddEditForm = ({
    blog,
    handleCloseForm,
    setBlogEditView,
}: BlogAddEditFormProps) => {
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const user = useAuthentication();
    const {
        mutate: addUpdateBlog,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useMutation(postBlog, {
        onSuccess: (data) => {
            setBlogEditView ? setBlogEditView(data.data) : {};
        },
    });

    const setStatus = useSetStatus();

    const initialValues: IBlog = blog
        ? {
              title: blog.title,
              subtitle: blog.subtitle,
              content: blog.content,
              published: blog.published,
              UserId: blog.UserId,
          }
        : {
              title: '',
              subtitle: '',
              content: '',
              published: false,
              UserId: user?.id || 1,
          };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            subtitle: Yup.string(),
            content: Yup.mixed().test(
                'checkContent',
                'Content is required',
                // eslint-disable-next-line
                function (value: any) {
                    const state = stateFromHTML(value);

                    return state.hasText() && value;
                }
            ),
        }),
        onSubmit: (values: IBlog) => {
            const val = blog?.id
                ? {
                      ...blog,
                      title: values.title,
                      subtitle: values.subtitle,
                      content: values.content,
                  }
                : {
                      ...values,
                      published: false,
                      UserId: user?.id || 1,
                  };
            addUpdateBlog(val);
        },
    });

    useEffect(() => {
        if (formik && formik.initialValues && !formik.dirty) {
            setEditorState(
                EditorState.createWithContent(
                    stateFromHTML(formik.initialValues.content)
                )
            );
        }
        // eslint-disable-next-line
    }, [formik.initialValues.content]);

    const handleEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        const htmlText = stateToHTML(newEditorState.getCurrentContent());
        formik.setFieldValue('content', htmlText);
    };

    useEffect(() => {
        if (isSuccess && !isLoading && !isError && !error) {
            setStatus(SNACKBAR_TYPE.SUCCESS, 'Blog posted successfully.');
            formik.resetForm();
            handleCloseForm(false);
        } else if (!isLoading && isError && error) {
            setStatus(SNACKBAR_TYPE.ERROR, 'Something went wrong');
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
                <div>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorStateChange}
                        onBlur={() => formik.setFieldTouched('content', true)}
                    />
                </div>
                {formik.errors?.content && formik.touched?.content && (
                    <span
                        className="invalid-feedback-text"
                        style={{ color: 'red' }}
                    >
                        {formik.errors?.content}{' '}
                    </span>
                )}
            </div>
            <Button
                type={'submit'}
                label="Submit"
                handleClick={
                    // eslint-disable-next-line
                    (e: any) => formik.handleSubmit(e)
                }
            />
        </div>
    );
};

export default BlogAddEditForm;
