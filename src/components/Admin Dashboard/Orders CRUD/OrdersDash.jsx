import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import style from './OrdersDash.module.css';

function OrdersDash() {
  const [order, setorder] = useState([]);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getAllOrders() {
    setisloading(true);
    const authToken = localStorage.getItem("userToken");

    try {
      let { data } = await axios.get(`http://localhost:4000/api/v1/order`, {
        headers: {
          token: ` ${authToken}`,
        },
      });
      if (data.message === "Orders retrieved successfully") {
        setorder(data.orders);
        setisloading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
      setisloading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleDelete = async (orderId) => {
    setisloading(true);
    const authToken = localStorage.getItem("userToken");
    if (!authToken) {
      toast.error("Token not found!", { duration: 2000 });
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/v1/order/${orderId}`, {
        headers: {
          token: ` ${authToken}`,
        },
      });
      setorder(order.filter((order) => order._id !== orderId));
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {isloading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
            {order?.map((ord) => (
              <div key={ord?._id} className="col-md-6 col-lg-4 mb-4">
                <div className="order cursor-pointer p-3 h-100">
                  <div className="text-center w-100">
                    <div className={`${style.card} card h-100`}>
                      <div className="card-header py-2">
                        <h1 className="text-bold text-main">Order</h1>
                        {ord?.user && (
                          <>
                            <h4 className="text-bold text-main">User Details</h4>
                            <hr />
                            <p><strong>User Name:</strong> {ord.user.name}</p>
                            <p><strong>Phone:</strong> {ord.user.phone}</p>
                          </>
                        )}
                        <p><strong>Total Price:</strong> {ord.totalOrderPrice}</p>
                        <p><strong>Price After Discount:</strong> {ord.totalOrderAfterDiscount}</p>
                        <hr />
                        <h4 className="text-bold text-main">Shipping Address</h4>
                        <hr />
                        <p><strong>City:</strong> {ord.shippingAddress.city}</p>
                        <p><strong>Address:</strong> {ord.shippingAddress.addres}</p>
                        <p><strong>Phone:</strong> {ord.shippingAddress.phone}</p>
                        <hr />
                        <h4 className="text-bold text-main">Products</h4>
                        <hr />
                        {ord.cartItems.map((item) => (
                          <div key={item.product?._id} className="mb-2">
                            <div className="row">
                              <div className="col-4 col-md-3 my-auto">
                                <img src={item?.product?.imgCover}  className="img-fluid" />
                              </div>
                              <div className="col-8 col-md-9">
                                <p><strong>Product Name:</strong> {item?.product?.title}</p>
                                <p><strong>Product Price:</strong> {item?.product?.price}</p>
                                <p><strong>Product Quantity:</strong> {item?.quantity}</p>
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))}
                        <button
                          className="btn btn-danger my-auto"
                          onClick={() => handleDelete(ord?._id)}
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default OrdersDash;
