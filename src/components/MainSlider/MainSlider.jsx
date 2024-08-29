import React from 'react';
import Slider from "react-slick";
import styles from './MainSlider.module.css';
import slide1 from '../../assets/images/243775883_4299819926791935_171819211364651201_n.jpg';
import slide2 from '../../assets/images/38248778_1726306384143315_1730077642180263936_n.jpg';
import slide3 from '../../assets/images/406352090_796337699177360_7152186322397382234_n.png';
import slide4 from '../../assets/images/96537170_2883990105041598_6274049077369896960_n.jpg';
import slide5 from '../../assets/images/419229170_827771166034013_7820729897426592292_n.jpg';
// import slide6 from '../../assets/images/slider-2.jpeg';
// import slide7 from '../../assets/images/banner-4.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000 // Slide will change every 3 seconds
  };

  return (
    <>
      <div className="container my-5">
        <div>
          <Slider {...settings}>
            <img className='w-100' src={slide3} height={200} />
            <img className='w-100' src={slide2} height={200} />
            <img className='w-100' src={slide4} height={200} />
            {/* <img className='w-100' src={slide5} height={200} /> */}
            {/* <img className='w-100' src={slide6} height={200}/>
            <img className='w-100' src={slide7} height={200}/> */}
            <img className='w-100' src={slide1} height={200} />
          </Slider>
        </div>
      </div>
    </>
  );
}
