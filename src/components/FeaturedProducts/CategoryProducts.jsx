import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import styles from "../Products/Products.module.css";

export default function CategoryProducts() {
  const { slug } = useParams();
  const { addToCart, setnumOfCartItem, addToWishlist } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/category/categories/${slug}/products`);
        setProducts(data.products);
      } catch (error) {
        toast.error("Failed to fetch products", { duration: 2000 });
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [slug]);

  async function addProductToWishlist(productId) {
    try {
      const { data } = await addToWishlist(productId);
      if (data.message === "Done") {
        toast.success(data.message, { duration: 2000 });
      } else {
        toast.error(data.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist", { duration: 2000 });
    }
  }

  async function addProductToCart(productId) {
    try {
      const response = await addToCart(productId);
      if (response.data.message === "Product Added To Cart") {
        setnumOfCartItem(response.data.cart.numOfCartItems);
        toast.success(response.data.message, { duration: 2000 });
      } else {
        toast.error(response.data.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to add product to cart", { duration: 2000 });
    }
  }

  return (
    <div className="container">
      <div className="row">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product._id} className="col-md-2">
                <div className={`product cursor-pointer px-2 py-3 ${styles.product}`}>
                  <Link to={"/product-details/" + product._id}>
                    <img className="w-100" src={product.imgCover} alt={product.title} />
                    <span className="text-main fw-bold font-sm">
                      {product.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">{product.title}</h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  <div className="d-flex justify-content-around mt-2">
                    <div>
                      <button onClick={() => addProductToCart(product._id)} className="btn bg-main text-light">
                        Add To Cart
                        <i className="fa-solid fa-cart-plus text-light fa-md "></i>
                      </button>
                    </div>

                    <div>
                      <i onClick={() => addProductToWishlist(product._id)} className="fa-solid fa-heart text-main fa-2x "></i>
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
