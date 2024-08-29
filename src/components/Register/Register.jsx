import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
let navigate =useNavigate()
const [isloading, setisloading] = useState(false)
const [messageError, setmessageError] = useState('')

  async function handleRegister(values){
    setisloading(true)
   let {data}= await axios.post(`http://localhost:4000/api/v1/auth/signup`,values).catch((errr)=>{
    setisloading(false)
    setmessageError(errr.response.data.message);
   })
   console.log(data);

   if(data.message==="added")
   {
    setisloading(false)
    navigate('/login')
   }
    console.log(values);
  }

  let validationSchema = Yup.object({
    name:Yup.string().required("name is required").min(3,"min length is 3").max(10,"max length is 10"),
    email:Yup.string().required("email is required").email("email is invalid"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"Password must start with Uppercase and max length is 10"),
    rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")],"password and repassword not matches"),
    phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,"phone must be an egyption phone number"),
  })
  let formik =useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema,
    onSubmit:handleRegister
  })
  return<>
  <div className="w-75 mx-auto py-4">

    <h3>Register Now:</h3>
    {messageError.length>0 ? <div className="alert alert-danger">{messageError} </div>:null}
   
    
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input  onBlur={formik.handleBlur} className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id='name'/>
       {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div>:null}

      <label htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div>:null}

      <label htmlFor="password">Password:</label>
      <input onBlur={formik.handleBlur} className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password'/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div>:null}

      <label htmlFor="rePassword">RePassword:</label>
      <input onBlur={formik.handleBlur}  className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword'/>
       {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div>:null}

      <label htmlFor="phone">Phone:</label>
      <input  onBlur={formik.handleBlur} className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone'/>
        {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div>:null}  

          {isloading? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
       
     
    </form> 
  </div>
  </>
}
