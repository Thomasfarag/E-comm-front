import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import './ProductDash.module.css'

function ProductDash() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/product`);
      const productsWithDetails = await Promise.all(
        data.results.map(async (product) => {
          const brandName = await getBrand(product.brand);
          const categoryName = await getCategory(product.category);
          return { ...product, brandName, categoryName };
        })
      );
      setProducts(productsWithDetails);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getBrand(id) {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/brand/${id}`);
      return data.results.name;
    } catch (error) {
      console.error("Error fetching brand:", error);
      return "Unknown Brand";
    }
  }

  async function getCategory(id) {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/category/${id}`);
      return data.results.name;
    } catch (error) {
      console.error("Error fetching category:", error);
      return "Unknown Category";
    }
  }

  const handleDelete = async (productId) => {
    setIsLoading(true);
    try {
      const token = await fetchToken();
      await axios.delete(`http://localhost:4000/api/v1/product/${productId}`, {
        headers: {
          token: `${token}`
        }
      });
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product Deleted Successfully!', { duration: 2000 });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchToken = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  };

  return (
    <div className="container">
      <h1>Products CRUD</h1>
      <Link to="../addProduct" className="btn bg-main text-light mb-3">
        Add Product
      </Link>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={product.imgCover}
                className="card-img-top"
                alt={product.title}
                style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
              />
              <div className="card-body">
                <h5 className="card-title text-truncate">{product.title}</h5>
                <p className="card-text"><b>Price:</b> ${product.price}</p>
                {product.priceAfterDiscount && (
                  <p className="card-text text-success"><b>Discounted Price:</b> ${product.priceAfterDiscount}</p>
                )}
                <p className="card-text text-truncate"><b>Description:</b> {product.description}</p>
                <p className="card-text"><b>Quantity:</b> {product.quantity}</p>
                <p className="card-text"><b>Sold:</b> {product.sold}</p>
                <p className="card-text"><b>Category:</b> {product.categoryName}</p>
                <p className="card-text"><b>Brand:</b> {product.brandName}</p>
              </div>
              <div className="card-footer bg-transparent border-top-0 d-flex justify-content-center">
                <button
                  className="btn btn-danger w-75"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDash;
