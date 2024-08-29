import axios from "axios";
import React, { useEffect, useState } from "react";

function AddProduct() {
  const [messageError, setMessageError] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgCover, setimgCover] = useState(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    priceAfterDiscount: "",
    category: "",
    brand: "",
    quantity: "",
    sold: "",
    description: ""
  });

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/category`);
      setCategories(data.results);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessageError("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  }

  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/brand`);
      setBrands(data.results);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setMessageError("Failed to fetch brands");
    } finally {
      setIsLoading(false);
    }
  }

  const handleimgCoverChange = (e) => {
    setimgCover(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.title) errors.push("Title is required");
    if (!formData.price || isNaN(formData.price)) errors.push("Valid price is required");
    if (!formData.priceAfterDiscount || isNaN(formData.priceAfterDiscount)) errors.push("Valid price after discount is required");
    if (!formData.category) errors.push("Category is required");
    if (!formData.brand) errors.push("Brand is required");
    if (!formData.quantity || isNaN(formData.quantity)) errors.push("Valid quantity is required");
    if (!formData.sold || isNaN(formData.sold)) errors.push("Valid sold number is required");
    if (!formData.description) errors.push("Description is required");
    if (!imgCover) errors.push("Cover image is required");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setMessageError(validationErrors.join(", "));
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("imgCover", imgCover);
    images.forEach((image) => {
      data.append(`images`, image);
    });

    // Append all other form data fields
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("quantity", formData.quantity);
    data.append("sold", formData.sold);
    data.append("description", formData.description);
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("priceAfterDiscount", formData.priceAfterDiscount);

    try {
      const token = await fetchToken();
      const response = await axios.post(
        "http://localhost:4000/api/v1/product",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      console.log("Product added successfully!", response.data);

      // Clear form fields after success
      setFormData({
        title: "",
        price: "",
        priceAfterDiscount: "",
        category: "",
        brand: "",
        quantity: "",
        sold: "",
        description: ""
      });
      setimgCover(null);
      setImages([]);
      document.getElementById('imgCover').value = null;
      document.getElementById('images').value = null;
      setMessageError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error adding product:", error);
      setMessageError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch token dynamically (example using localStorage)
  const fetchToken = async () => {
    const token = localStorage.getItem("userToken"); // Adjust as per your storage mechanism
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  };

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Add Product Now:</h3>

        {messageError && <div className="alert alert-danger">{messageError}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            className="form-control mb-2"
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            className="form-control mb-2"
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />

          <label htmlFor="priceAfterDiscount">Price After Discount:</label>
          <input
            className="form-control mb-2"
            type="number"
            name="priceAfterDiscount"
            id="priceAfterDiscount"
            value={formData.priceAfterDiscount}
            onChange={handleChange}
          />

          <label htmlFor="category">Category:</label>
          <select
            className="form-select mb-2"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="brand">Brand:</label>
          <select
            className="form-select mb-2"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>

          <label htmlFor="quantity">Quantity:</label>
          <input
            className="form-control mb-2"
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <label htmlFor="sold">Sold:</label>
          <input
            className="form-control mb-2"
            type="number"
            name="sold"
            id="sold"
            value={formData.sold}
            onChange={handleChange}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control mb-2"
            name="description"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="imgCover">Image Cover:</label>
          <input
            className="form-control mb-2"
            type="file"
            name="imgCover"
            id="imgCover"
            onChange={handleimgCoverChange}
          />

          <label htmlFor="images">Images:</label>
          <input
            className="form-control mb-2"
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleImagesChange}
          />

          {isLoading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" className="btn bg-main text-white">
              Add Product
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default AddProduct;
