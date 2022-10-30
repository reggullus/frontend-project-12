import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/Auth.jsx';
import Pic from '../pictures/pic.1.jpeg';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const auth = useAuth();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required('Введите Имя')
      .min(3, 'Имя слишком короткое')
      .max(20, 'Имя слишком длинное'),
    password: Yup.string()
      .required('Введите пароль')
      .min(3, 'Пароль слишком короткий')
      .max(20, 'Пароль слишком длинный'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: SignupSchema,

    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data.token));
        auth.logIn();
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={Pic} className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      formik.touched.username && formik.errors.username
                        ? true : authFailed
                      }
                    required
                    ref={inputRef}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={
                      formik.touched.password && formik.errors.password
                        ? true : authFailed
                      }
                    required
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">{formik.touched.password && formik.errors.password ? formik.errors.password : 'Неверные имя пользователя или пароль'}</Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={formik.isSubmitting} variant="outline-primary">Submit</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/signup"> Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
