import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/Auth.jsx';
import Pic from '../images/avatar5.jpg';
import routes from '../routes.js';

const Signup = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required('Введите Имя')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
      .required('Введите пароль')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
      .required('')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: SignupSchema,

    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.signup(), values);
        localStorage.setItem('userId', JSON.stringify(res.data.token));

        auth.logIn();

        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
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
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={Pic} className="rounded-circle img-fluid img-thumbnail" width="80%" alt="Регистрация" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="username">Имя</Form.Label>
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
                        ? formik.errors.username : authFailed
                      }
                    required
                    ref={inputRef}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="password">Пароль</Form.Label>
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
                        ? formik.errors.password : authFailed
                      }
                    required
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">{ formik.errors.password }</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                  <Form.Control
                    type="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-confirmPassword"
                    isInvalid={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? formik.errors.confirmPassword : authFailed
                      }
                    required
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? formik.errors.confirmPassword : 'Такой пользователь уже существует'
                    }
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 mb-3 btn btn-outline-primary" type="submit" disabled={formik.isSubmitting} variant="outline-primary">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
