import React from 'react';
import styles from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import WhatsAppFixedButton from './WhatsAppFixedButton';

export default function Home() {
  return (
    <>
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <FeaturedProducts />
      </div>
      <WhatsAppFixedButton />
    </>
  );
}
