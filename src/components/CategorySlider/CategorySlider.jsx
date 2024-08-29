import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getCategories() {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/category');
      if (Array.isArray(data.results)) {
        console.log(data);
        setCategories(data.results);
      } else {
        setError("Unexpected data format");
        
        // console.log(data);
      }
    } catch (err) {
      if (err.response) {
        setError(`Server Error: ${err.response.statusText}`);
      } else if (err.request) {
        setError("Network Error: No response received from server");
      } else {
        setError(`Error: ${err.message}`);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: categories.length > 7 ? 7 : categories.length, // Adjust this condition as per your requirement
    slidesToScroll: 1
  };

  if (isLoading) {
    return <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>;
  }

  if (error) {
    return <div className='text-center text-danger'>{error}</div>;
  }

  return (
    <>

    <Slider {...settings}>
      {categories.map((category) => (
<Link to={`categoryProducts/${category.slug}`}>
        <div key={category._id}>
          <img className='w-100' height={200} src={category.image} alt={category.name} />
          <h2 className='h6 pt-2 text-center'>{category.name}</h2>
        </div>
      </Link>
      ))}
    </Slider>
        </>
  );
}
