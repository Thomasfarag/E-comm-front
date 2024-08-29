import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem("userToken");
    if (!authToken) {
      toast.error('Token not found!', { duration: 2000 });
      return;
    }

    console.log("Auth Token:", authToken); // Debug: Log the token to ensure it's retrieved correctly

    try {
      const response = await axios.post("http://localhost:4000/api/v1/category", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${authToken}` // Include the token in the Authorization header
        },
      });
      console.log(response.data.message);

      if (response.data.message === 'added'||"Category created") {
        console.log("Category added successfully!");
        toast.success('Category added successfully!', { duration: 2000 });
        // Clear the form fields
        setFormData({
          name: "",
          image: null,
        });
        // Clear the file input value
        document.getElementById('image').value = null;
      } else {
        console.error("Failed to add category");
        toast.error('Failed to add category!', { duration: 2000 });
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message); // Debug: Log the full error response
      toast.error('Error occurred!', { duration: 2000 });
    }
  };

  return (
    <>
    <div className="container">

  
      <h1>Add Category</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="image">Image:</label>
        <input
          className="form-control mb-2"
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />

        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
      </div>
    </>
  );
}

export default AddCategory;
