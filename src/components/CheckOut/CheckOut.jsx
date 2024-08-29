import React, { useContext } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckOut() {
  
  let {onlinePayment,cartId,setnumOfCartItem}=useContext(cartContext)
  console.log(cartId);
 
let navigate = useNavigate()
  async function handleSubmit(shippingAddress){
let response= await onlinePayment(cartId,shippingAddress);
console.log(response);

// console.log(cartId, shippingAddress);
    if (response?.data?.message==='Order created successfully') {
      
      toast.success("Order created successfully We will Contact with you",{duration:2000})
      setnumOfCartItem(0)
      // window.location.href = response.data.session.url
      navigate('/')
      
    }
  }
  let formik=useFormik({
    initialValues:{
      addres:'',
      phone:'',
      city:''
      
    },onSubmit:handleSubmit
  })
  return<>


      <div className="w-50 mx-auto py-5">
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="addres">Address:</label>
      <input className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.addres} type="text" name='addres' id='addres'/>
      <label htmlFor="phone">Phone:</label>
      <input className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone'/>
      <label htmlFor="city">City:</label>
      <input className='form-control  mb-2' onChange={formik.handleChange} value={formik.values.city} type="text" name='city' id='city'/>
        
        <button className='btn border-main w-100' type='submit'>
          submit
        </button>
</form>
      </div>
     
  </>
}
