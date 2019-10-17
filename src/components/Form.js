import React, {useState, useEffect} from 'react';
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import '../App.css';



function LoginForm({ values, errors, touched, status }) {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  console.log('users', users)
  return (
    <div>
    <Form>
      <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field name='name' type='text' placeholder='Name' />
      </div>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field name='email' type='email' placeholder='Email' />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field name='password' type='password' placeholder='Password' />
      </div>
      <label>Terms of Service<Field name='terms' type='checkbox' checked={values.terms} /></label>

      <input type='submit' />

    </Form>
    {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          {/* <li>Food: {user.food}</li> */}
        </ul>
      ))}
    </div>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false,
    };
  },
  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name not valid"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required"),
    // terms: Yup.bool(true),
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { setStatus, resetForm } ) {
    console.log(values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res); // Data was created successfully and logs to console
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log(err); // There was an error creating the data and logs to console
      });
  }
})(LoginForm);

export default FormikLoginForm;