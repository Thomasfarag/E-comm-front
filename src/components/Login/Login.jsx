import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(`http://localhost:4000/api/v1/auth/signIn`, values);
      if (data.message === "success") {
        localStorage.setItem('userToken', data.token);
        saveUserData();

        const decodedToken = jwt_decode(data.token);
        const userRole = decodedToken.role;

        setIsLoading(false);

        if (userRole === 'admin') {
          navigate('/adminDash');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setIsLoading(false);
      setMessageError(error.response.data.message);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with an uppercase letter and have a maximum length of 10 characters"),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <div className="w-75 mx-auto py-4">
      <h3>Login Now:</h3>
      {messageError.length > 0 ? <div className="alert alert-danger">{messageError}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        {isLoading ? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
      </form> <br />
      <Link className='link text-primary text-decoration-underline ' to={'../register'}> You Don't Have An Account? Create One </Link>
    </div>
  );
}
