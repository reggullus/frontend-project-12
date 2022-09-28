import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function Login() {
  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <Field
                name="username"
                placeholder="Ваш ник"
                autoComplete="username"
                className="form-control"
              />
            </div>
            <div className="form-floating mb-4">
              <Field
                name="password"
                autoComplete="password"
                placeholder="Пароль"
                className="form-control is-invalid"
              />
              {(errors.password && touched.password) || (errors.username && touched.username) ? (
                <div className="invalid-tooltip">
                  Неверные имя пользователя или пароль
                </div>
              ) : null}
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Вход</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
