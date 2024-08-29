import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import WhatsAppFixedButton from "../Home/WhatsAppFixedButton";

export default function Cart() {
  const {
    getLoggedUserCart,
    removeCartItem,
    updateCartquantity,
    clearCart,
    setnumOfCartItem,
    cartId,
    getLCart
  } = useContext(cartContext);

  const [cartDetails, setcartDetails] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  async function getCart() {
    setisloading(true);
    try {
    let response = await getLoggedUserCart();
    console.log(response.data);
      
      if (response.data.message === "Done") {
        setcartDetails(response.data.cart.cartItems || []); // Ensure cartItems is an array
        
        console.log(response.data.cart._id);
        
        setisloading(false);
      }
    } catch (error) {
      console.error("Error: " + error);
      setErrorMsg(error.response?.data?.message || "Error fetching cart");
      setisloading(false);
    }
  }

  async function deleteItem(productId) {
    try {
      let response = await removeCartItem(productId);
      if (response.data.message === "Deleted") {
        toast.success("Product Removed Successfully", { duration: 2000 });
        setcartDetails(response.data.cart.cartItems || []);
        setnumOfCartItem(response.data.cart.numOfCartItems);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product");
    }
  }

  async function updateProductQuantity(productId, quantity) {
    if (quantity < 1) return;
    try {
      let response = await updateCartquantity(productId, quantity);
      if (response.data.message === "Updated") {
        toast.success("Product Quantity Updated Successfully", {
          duration: 2000,
        });
        setcartDetails(response.data.cart.cartItems || []);
        setnumOfCartItem(response.data.cart.numOfCartItems);
      } else {
        console.error("Unexpected response structure:", response);
        toast.error("Failed to update product quantity");
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
      toast.error("Failed to update product quantity");
    }
  }

  async function clearUserCart() {
    try {
      let response = await clearCart();
      if (response.data.message === "Cart cleared") {
        toast.success("Cart Cleared Successfully", { duration: 2000 });
        setcartDetails([]);
        setnumOfCartItem(0);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  }
  function handleCheckout() {
    navigate('/checkout', { state: { cartDetails, cartId } });
  }
  
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {isloading ? (
        <div className="text-center">
          <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
        </div>
      ) : errorMsg ? (
        <div className="text-center">
          <h3>{errorMsg}</h3>
        </div>
      ) : (
        <div className="bg-main-light p-4 my-4">
          <h3>Shopping Cart:</h3>
          {cartDetails.length > 0 && (
            <>
              <h6 className="text-main">Total: {cartDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)} EGP</h6>
              <button onClick={clearUserCart} className="btn btn-danger">
                Clear Cart
              </button>
            </>
          )}
{/* {console.log(cartId)} */}
          {cartDetails.length > 0 ? (
            cartDetails.map((product) => (
              <div
                key={product._id}
                className="row border-bottom py-2 my-2 align-items-center"
              >
                
                <div className="col-md-1">
                  <img
                    src={product.product.imgCover}
                    alt="item"
                    className="w-100"
                  />
                 
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div>
                    <h6>{product.product.title}</h6>
                    <h6 className="text-main">Price: {product.price}</h6>
                    <button
                      onClick={() => deleteItem(product._id)}
                      className="btn m-0 p-0"
                    >
                      <i className="fa-regular text-danger fa-trash-can"></i>{" "}
                      Remove
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        updateProductQuantity(product.product._id, product.quantity + 1)
                      }
                      className="btn border-main btn-sm"
                    >
                      +
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateProductQuantity(product.product._id, product.quantity - 1)
                      }
                      className="btn border-main btn-sm"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4>Your cart is empty.</h4>
          )}
          <button className="btn bg-main">
            <Link
              onClick={handleCheckout}
              className="text-white"
              to={"/checkout"}
            >
              Checkout
            </Link>
          </button>
        </div>
      )}
      <WhatsAppFixedButton />
    </>
  );
}
