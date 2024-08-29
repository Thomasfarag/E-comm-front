import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import style from "./AdminDashboard.module.css";

function AdminDashboard({ onClose }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };
  const [selectedValue, setSelectedValue] = useState("value-1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center pt-5">
        <div className="row w-100 mb-4">
          <div className={`col-12 ${style.wrapper}`}>
            <div className={style.option}>
              <input
                // defaultChecked={true}
                value="Products"
                name="btn"
                type="radio"
                className={style.input}
                onClick={() => handleNavigation('/adminDash')}
              />
              <div className={style.btn}>
                <Link className={style.span}>Products</Link>
              </div>
            </div>
            <div className={style.option}>
              <input
                value="categories"
                name="btn"
                type="radio"
                className={style.input}
                onClick={() => handleNavigation('/adminDash/category')}
              />
              <div className={style.btn}>
                <span className={style.span}>Categories</span>
              </div>
            </div>
            <div className={style.option}>
              <input
                value="Brands"
                name="btn"
                type="radio"
                className={style.input}
                onClick={() => handleNavigation('/adminDash/brands')}
              />
              <div className={style.btn}>
                <span className={style.span}>Brands</span>
              </div>
            </div>
            <div className={style.option}>
              <input
                value="Users"
                name="btn"
                type="radio"
                className={style.input}
                onClick={() => handleNavigation('/adminDash/users')}
              />
              <div className={style.btn}>
                <span className={style.span}>Users</span>
              </div>
            </div>
            <div className={style.option}>
              <input
                value="Orders"
                name="btn"
                type="radio"
                className={style.input}
                onClick={() => handleNavigation('/adminDash/orders')}
              />
              <div className={style.btn}>
                <span className={style.span}>Orders</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
