import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { signUp } from '../apis/AuthAPI';
import GlobalAlert, { SNACKBAR_TYPE } from '../components/Alert';
import { useSetStatus } from '../context/statusContext';
import { useMutation } from 'react-query';
import Button from '../components/Button';

interface SignUpForm {
    setSignUpForm: Function;
}

const SignUp = ({ setSignUpForm }: SignUpForm) => {
    const {
        mutate: createUser,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useMutation(signUp);

    const setStatus = useSetStatus();

    const initialValues: any = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8).required('Password is required'),
        }),
        onSubmit: (values: any) => {
            createUser(values);
        },
    });

    useEffect(() => {
        if (isSuccess && !isLoading && !isError && !error) {
            setStatus(SNACKBAR_TYPE.SUCCESS, 'SignUp successful.');
            formik.resetForm();
            setSignUpForm(false);
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
                <label>First Name</label>
                <input
                    className={
                        formik.errors &&
                        formik.errors?.firstName &&
                        formik.touched &&
                        formik.touched?.firstName
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    name="firstName"
                    type="textarea"
                    value={formik.values?.firstName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.firstName &&
                    formik.touched &&
                    formik.touched?.firstName && (
                        <div className="invalid-feedback">
                            {(formik.errors?.firstName as string) || ''}
                        </div>
                    )}
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    className={
                        formik.errors &&
                        formik.errors?.lastName &&
                        formik.touched &&
                        formik.touched?.lastName
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    name="lastName"
                    type="textarea"
                    value={formik.values?.lastName || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.lastName &&
                    formik.touched &&
                    formik.touched?.lastName && (
                        <div className="invalid-feedback">
                            {(formik.errors?.lastName as string) || ''}
                        </div>
                    )}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    className={
                        formik.errors &&
                        formik.errors?.email &&
                        formik.touched &&
                        formik.touched?.email
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    name="email"
                    type="textarea"
                    value={formik.values?.email || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.email &&
                    formik.touched &&
                    formik.touched?.email && (
                        <div className="invalid-feedback">
                            {(formik.errors?.email as string) || ''}
                        </div>
                    )}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    className={
                        formik.errors &&
                        formik.errors?.password &&
                        formik.touched &&
                        formik.touched?.password
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    name="password"
                    type="password"
                    value={formik.values?.password || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors &&
                    formik.errors?.password &&
                    formik.touched &&
                    formik.touched?.password && (
                        <div className="invalid-feedback">
                            {(formik.errors?.password as string) || ''}
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

export default SignUp;
