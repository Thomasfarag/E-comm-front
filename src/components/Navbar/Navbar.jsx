import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import logo from "../../assets/images/WhatsApp Image 2024-07-23 at 19.48.26_ac993c1c-modified.png";
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

export default function Navbar({ userData, logout }) {
  let { numOfCartItems } = useContext(cartContext);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-main bg-main">
        <div className="container text-light">
          <Link className="navbar-brand" to="/">
            <img className={`border-4 border rounded-pill ${styles.largeLogo}`} src={logo} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav ms-2 mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link text-white ${styles.navLink}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link text-white ${styles.navLink}`} to="products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link text-white ${styles.navLink}`} to="categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link text-white ${styles.navLink}`} to="brands">Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link text-white ${styles.navLink}`} to="about">About</Link>
                </li>
                {userData.role === 'admin' && (
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${styles.navLink}`} to="adminDash">Admin Dashboard</Link>
                  </li>
                )}
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <a href="https://www.facebook.com/share/WQW22gYEippc4e66/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                  <i className='fab mx-2 fa-facebook fa-xl text-light '></i>
                </a>
                <i className='fab mx-2 fa-xl fa-twitter '></i>
                <i className='fab mx-2 fa-xl fa-instagram'></i>
                <i className='fab mx-2 fa-xl fa-tiktok'></i>
                <i className='fab mx-2 fa-xl fa-linkedin'></i>
                <a href="https://wa.me/201279622692" target="_blank" rel="noopener noreferrer">
                  <i className='fab mx-2 fa-whatsapp fa-xl text-light '></i>
                </a>
              </li>
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link text-light ${styles.navLink}`} to="login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-light ${styles.navLink}`} to="register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item position-relative">
                    <Link className={`nav-link text-light px-2 ${styles.navLink}`} to="cart">
                      <i className='fas fa-shopping-cart fa-2x'></i>
                      <span className='badge position-absolute top-0 end-0 bg-info text-dark'>{numOfCartItems}</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={logout} className={`btn btn-danger mx-2`}>Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
