import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

function AddBrand() {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("logo", formData.logo);

    const authToken = localStorage.getItem("userToken");
    if (!authToken) {
      toast.error('Token not found!', { duration: 2000 });
      return;
    }

    console.log("Auth Token:", authToken); // Debug: Log the token to ensure it's retrieved correctly


    try {
      const response = await axios.post("http://localhost:4000/api/v1/brand", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: ` ${authToken}` // Include the token in the Authorization header
        },
      });
      // console.log(response.data.message);

      if (response.data.message === 'added') {
        console.log("Brand added successfully!");
        toast.success('Brand Added Successfully!', { duration: 2000 });
        // Clear the form fields
        setFormData({
          name: "",
          logo: null,
        });
        // Clear the file input value
        document.getElementById('logo').value = null;
      } else {
        console.error("Failed to add brand");
        toast.error('Failed to add brand!', { duration: 2000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Error occurred!', { duration: 2000 });
    }
  };

  return (
    <>
    <div className="container">

   
      <h1>Add Brand</h1>

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

        <label htmlFor="logo">Logo:</label>
        <input
          className="form-control mb-2"
          type="file"
          name="logo"
          id="logo"
          onChange={handleLogoChange}
        />

        <button type="submit" className="btn btn-primary">
          Add Brand
        </button>
      </form>
      </div>
    </>
  );
}

export default AddBrand;
