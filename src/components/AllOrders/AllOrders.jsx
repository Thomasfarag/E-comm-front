import React, { useEffect, useState } from 'react'
import styles from './AllOrders.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getOrders() {
    setisloading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders`)
    setOrders(data.data);
    setisloading(false)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="row">
      {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <>
          {orders?.map((order) => (
            <div key={order._id} className="col-md-3 text-center">
              <Link to={`orderDetails/${order?.user?._id}`}> 
                <div className="product cursor-pointer px-2 py-3">
                  <h2 className='text-main fw-bold font-sm'>Client Name:{order?.user?.name}</h2>
                  <div className="text-center">
                    <h4>Total Price:{order?.totalOrderPrice}</h4>
                    <h6>phone:{order?.user?.phone}</h6>
                    <p className='text-muted'> Payment Method:{order?.paymentMethodType}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
