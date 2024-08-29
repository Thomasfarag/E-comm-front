import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import WhatsAppFixedButton from './../Home/WhatsAppFixedButton';

export default function Products() {
  let { addToCart, setnumOfCartItem, addToWishlist } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts(); // Fetch all products initially
  }, []);

  useEffect(() => {
    // Fetch products whenever the search term changes
    const delayDebounceFn = setTimeout(() => {
      getProducts(searchTerm);
    }, 500); // Add a debounce to avoid too many API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  async function getProducts(title = "") {
    setIsLoading(true);
    try {
      const url = title
        ? `http://localhost:4000/api/v1/product/search/${title}` // Search products by title
        : `http://localhost:4000/api/v1/product`; // Fetch all products
      const { data } = await axios.get(url);
      console.log(data);
      if (data.results && data.results.length > 0) {
        setProducts(data.results);
      } else {
        setProducts([]);
        toast.error("No products found with the given title", { duration: 2000 });
      }
    } catch (error) {
      toast.error("An error occurred while fetching products", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

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
      if (response.data.message === "Product Added To Cart" ||response.data.message === "cart Created") {
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
    <div className="container pt-3">
      <form onSubmit={(e) => e.preventDefault()} className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="row">
        {isLoading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="col-md-2">
                  <div className="product cursor-pointer px-2 py-3">
                    <Link to={`/product-details/${product._id}`}>
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
              ))
            ) : (
              <div className="text-center w-100">
                <p>No products found</p>
              </div>
            )}
          </>
        )}
      </div>
      <WhatsAppFixedButton />

    </div>
  );
}
