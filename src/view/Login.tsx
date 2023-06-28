import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ILogin } from '../types/AuthTypes';
import { login } from '../apis/AuthAPI';
import Button from '../components/Button';

interface LoginProps {
    setLoginForm: (arg0: boolean) => void;
}

const Login = ({ setLoginForm }: LoginProps) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Please enter email'),
            password: Yup.string().required('Please enter password'),
        }),
        onSubmit: (values: ILogin) => {
            const loginUser = async () => {
                try {
                    const response = await login(values);
                    if (response) {
                        localStorage.setItem(
                            'blogUser',
                            JSON.stringify(response?.data || null)
                        );
                        setLoginForm(false);
                        window.location.href = '/';
                    } else {
                        throw Error();
                    }
                } catch (e) {
                    formik.setFieldError(
                        'password',
                        'Invalid email or password'
                    );
                }
            };

            loginUser();
        },
    });
    return (
        <div className="login-page">
            <div className="form-section">
                <div className="login-form-container">
                    <div className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <div
                                className={
                                    formik.errors &&
                                    formik.errors?.password &&
                                    formik.touched &&
                                    formik.touched?.password
                                        ? 'is-invalid'
                                        : ''
                                }
                            >
                                <input
                                    className={
                                        formik.errors &&
                                        formik.errors?.email &&
                                        formik.touched &&
                                        formik.touched?.email
                                            ? 'form-control is-invalid'
                                            : 'form-control'
                                    }
                                    name="email"
                                    value={formik.values?.email || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors &&
                                    formik.errors?.email &&
                                    formik.touched &&
                                    formik.touched?.email && (
                                        <div className="invalid-feedback">
                                            {formik.errors?.email || ''}
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div
                                className={
                                    formik.errors &&
                                    formik.errors?.password &&
                                    formik.touched &&
                                    formik.touched?.password
                                        ? 'is-invalid'
                                        : ''
                                }
                            >
                                <input
                                    className={
                                        formik.errors &&
                                        formik.errors?.password &&
                                        formik.touched &&
                                        formik.touched?.password
                                            ? 'form-control is-invalid'
                                            : 'form-control'
                                    }
                                    name="password"
                                    type="password"
                                    value={formik.values?.password || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.errors &&
                                formik.errors?.password &&
                                formik.touched &&
                                formik.touched?.password && (
                                    <div className="invalid-feedback">
                                        {formik.errors?.password || ''}
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="login-footer">
                        <Button
                            type={'submit'}
                            label="Login"
                            handleClick={
                                // eslint-disable-next-line
                                (e: any) => formik.handleSubmit(e)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
