import React from 'react';
import { Form, Field, Formik } from "formik";

import '../App.css';

const LoginForm = () => {
  return (
    <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values, actions);
          actions.resetForm();
        }}
        render={props => {
          return (
            <Form>
              <Field name='name' type='text' placeholder='Name' />
              <Field name='email' type='email' placeholder='Email' />
              <Field name='password' type='password' placeholder='Password' />
              <label>Terms of Service<Field name='terms' type='checkbox'/></label>

              <input type='submit' />
            </Form>
          )
        }}
    />
  );
};

export default LoginForm;