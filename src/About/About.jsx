import React from "react";
import styles from "./About.module.css";
import WhatsAppFixedButton from "../components/Home/WhatsAppFixedButton";

const locations = [
  {
    id: 'location1',
    name: 'الفرع الرئيسي',
    address: 'بشارع سعد زغلول قبلي موقـف السريع',
    link: 'https://maps.app.goo.gl/CLzFPwWiJSNa6x5e7' // رابط خرائط جوجل للفرع الرئيسي
  },
  {
    id: 'location2',
    name: 'الفرع الثاني',
    address: 'المنيا الجديده الحي السادس مول العاصمه خلف نادي الطيران',
    link: 'https://maps.app.goo.gl/tuSgkFuMSpWECgiD8' // رابط خرائط جوجل للفرع الثاني
  }
];

function About() {
  const handleCardClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className={`container`}>
      <h1 className={`mt-4 text-center ${styles.customFont}`}>
        مراكز عصام مشمش للديكورات الحديثه والدهانات
      </h1>
      <hr className={styles.hr} />
      <p className={`text-center ${styles.customFont}`}>
        -----------------------
        <br />
        {locations.map(location => (
          <React.Fragment key={location.id}>
            🔴 <a href={location.link} target="_blank" rel="noopener noreferrer">{location.name}</a> - {location.address}
            <br />
          </React.Fragment>
        ))}
        <br />
        🔴 ارقام التليفون للتواصل :01205074555 - 01210252040📱
      </p>
      <div className={`mt-3 ${styles.locationCardsContainer}`}>
        {locations.map(location => (
          <div
            key={location.id}
            className={styles.locationCard}
            onClick={() => handleCardClick(location.link)}
          >
            <div className={styles.locationIcon}>
              <i className="fas fa-map-marker-alt"></i> {/* Font Awesome icon */}
            </div>
            <h2 className={styles.locationTitle}>{location.name}</h2>
            <p className={styles.locationAddress}>{location.address}</p>
          </div>
        ))}
      </div>
      <WhatsAppFixedButton />
    </div>
  );
}

export default About;
