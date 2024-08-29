import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  let { addToCart, setnumOfCartItem } = useContext(cartContext);
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  async function getProduct() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `http://localhost:4000/api/v1/product/${id}`
      );
     console.log(data);
      setProduct(data.results);
      getCategory(data.results.category); // Pass the category ID
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  async function getCategory(categoryId) {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/category/${categoryId}`);
      setCategoryName(data.results.name);
    } catch (error) {
      console.error("Error fetching category:", error);
      setCategoryName("Unknown Category");
    }
  }

  async function addProductToCart(productId) {
    try {
      let response = await addToCart(productId);
      console.log(response);
      if (response.data.message==="Product Added To Cart") {
        setnumOfCartItem(response.data.cart.numOfCartItems);
        toast.success(response.data.message, { duration: 2000 });
      } else {
        toast.error(response?.message || "Failed to add to cart", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      toast.error("Failed to add to cart", { duration: 2000 });
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container">
      <div className="row my-5 align-items-center justify-content-center">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
            <div className="col-md-6 col-lg-4">
              {product.images && product.images.length > 0 && (
                <Slider {...settings}>
                  {product.images.map((img, index) => (
                    <img src={img} key={index} className="w-100" alt={`Product Image ${index + 1}`} />
                  ))}
                </Slider>
              )}
            </div>
            <div className="col-md-6 col-lg-8 mt-4 mt-md-0">
              <h3>{product.title}</h3>
              <p className="text-muted p-2">{product.description}</p>
              {product.category && (
                <span className="text-main fw-bold font-sm">
                  {product.category.name}
                </span>
              )}
              <div className="d-flex flex-column flex-md-row justify-content-between">
                {product.price === product.priceAfterDiscount ? (
                  <span className="text-muted mt-2">{product.price} EGP</span>
                ) : (
                  <span className="text-muted mt-2">
                    {product.price} EGP{" "} <br />
                    <span className="text-main fw-bold">
                      {" "}
                      Price After Discount {product.priceAfterDiscount} EGP
                    </span>
                  </span>
                )}
                {
                  <span className="text-main fw-bold font-sm">
                    Quantity: {product.quantity}
                    {/* {console.log(product.quantity)} */}
                  </span>
                }
                {
                  <span className="text-main fw-bold font-sm">
                    Category: {categoryName}
                  </span>
                }
              </div>
              <button
                onClick={() => {
                  addProductToCart(product._id);
                }}
                className="btn bg-main text-white w-100 mt-3"
              >
                Add To Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
