import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './OrderDetails.module.css';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  let params = useParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getOrders(id) {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getOrders(params.id);
  }, [params.id]);

  return (
    <div className="container">
      <div className="row my-5 align-items-center justify-content-center ">
        {isLoading ? (
          <div className='text-center'>
            <i className='fas fa-spinner fa-3x fa-spin text-main'></i>
          </div>
        ) : (
          <>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <div className="col-md-4" key={order.id}>
                  <div className="product cursor-pointer px-2 py-3">
                    <h2 className='text-main fw-bold font-sm'>Client Name: {order?.user?.name}</h2>
                    <div className="text-center">
                      <h4>Total Price: {order?.totalOrderPrice}</h4>
                      <h6>Phone: {order?.user?.phone}</h6>
                      <p className='text-muted'>Payment Method: {order?.paymentMethodType}</p>
                    </div>
                  </div>
                  
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
