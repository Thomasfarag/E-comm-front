import React from 'react';
import styles from './WhatsAppFixedButton.module.css';

export default function WhatsAppFixedButton() {
  return (
    
    <div className={styles.fixedButton}>
      <a href="https://wa.me/201279622692" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp fa-2x "></i>
      </a>
    </div>
  );
}
