import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Sidebar.module.css'; // Import the CSS file for styling

const SideBar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="sidebar-container">
      <Sidebar>
        <Menu
          className="w-100 m-0"
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem aria-selected="true" onClick={() => handleNavigation('/adminDash')}> Products </MenuItem>
          <MenuItem onClick={() => handleNavigation('../adminDash/category')}> Categories </MenuItem>
          <MenuItem onClick={() => handleNavigation('../adminDash/brands')}> Brands </MenuItem>
          <MenuItem component={<Link to="../adminDash/users" />}> Users </MenuItem>
          <MenuItem onClick={() => handleNavigation('../adminDash/orders')}> Orders </MenuItem>
        </Menu>
      </Sidebar>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
}

export default SideBar;
