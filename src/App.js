import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import ProdctedRoute from './components/ProtecredRoute/ProtecredRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Logout from './components/Logout/Logout';
import Brands from './components/Brands/Brands';
import CheckOut from './components/CheckOut/CheckOut';
import NotFound from './components/NotFound/NotFound';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { CartContextProvider, cartContext } from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Offline } from "react-detect-offline";
import Wishlist from './components/Wishlist/Wishlist';
import AllOrders from './components/AllOrders/AllOrders';
import OrderDetails from './components/OrderDetails/OrderDetails';
import AdminDashboard from './components/Admin Dashboard/AdminDashboard';
import ProductDash from './components/Admin Dashboard/ProductsCRUD/ProductDash';
import Addproduct from './components/Admin Dashboard/ProductsCRUD/Addproduct';
import CategoryDash from './components/Admin Dashboard/Categories CRUD/CategoryDash';
import AddCategory from './components/Admin Dashboard/Categories CRUD/AddCategory';
import BrandsDash from './components/Admin Dashboard/Brands CRUD/BrandsDash';
import AddBrand from './components/Admin Dashboard/Brands CRUD/AddBrand';
import UserDash from './components/Admin Dashboard/User CRUD/UserDash';
import OrdersDash from './components/Admin Dashboard/Orders CRUD/OrdersDash';
import CategoryProducts from './components/FeaturedProducts/CategoryProducts';
import About from './About/About';

function App() {
  const [userData, setUserData] = useState(null);
  const cart = useContext(cartContext);

  useEffect(() => {
    saveUserData();
  }, []);

  function saveUserData() {
    const encodedToken = localStorage.getItem('userToken');

    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken);
      } catch (error) {
        console.error('Token decode error:', error);
        localStorage.removeItem('userToken'); // Remove invalid token
        return <Navigate to={'/login'} />; // Redirect to login page
      }
    } else {
      setUserData(null);
    }
  }

  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    return <Navigate to={'/login'} />;
  }

  const routers = createHashRouter([
    {
      path: '',
      element: <Layout logout={logout} userData={userData} />,
      children: [
        { index: true, element: <ProdctedRoute><Home /></ProdctedRoute> },
        { path: 'products', element: <ProdctedRoute><Products /></ProdctedRoute> },
        { path: 'about', element: <ProdctedRoute><About /></ProdctedRoute> },
        { path: 'adminDash', element: <ProdctedRoute><AdminDashboard /></ProdctedRoute>, children: [
          { index: true, element: <ProdctedRoute><ProductDash /></ProdctedRoute> },
          { path: 'category', element: <ProdctedRoute><CategoryDash /></ProdctedRoute> },
          { path: 'brands', element: <ProdctedRoute><BrandsDash /></ProdctedRoute> },
          { path: 'users', element: <ProdctedRoute><UserDash /></ProdctedRoute> },
          { path: 'orders', element: <ProdctedRoute><OrdersDash /></ProdctedRoute> }
        ] },
        { path: 'addProduct', element: <ProdctedRoute><Addproduct /></ProdctedRoute> },
        { path: 'addCategory', element: <ProdctedRoute><AddCategory /></ProdctedRoute> },
        { path: 'categoryProducts/:slug', element: <ProdctedRoute><CategoryProducts /></ProdctedRoute> },
        { path: 'addbrand', element: <ProdctedRoute><AddBrand /></ProdctedRoute> },
        { path: 'product-details/:id', element: <ProdctedRoute><ProductDetails /></ProdctedRoute> },
        { path: 'cart', element: <ProdctedRoute><Cart /></ProdctedRoute> },
        { path: 'wishlist', element: <ProdctedRoute><Wishlist /></ProdctedRoute> },
        { path: 'categories', element: <ProdctedRoute><Categories /></ProdctedRoute> },
        { path: 'brands', element: <ProdctedRoute><Brands /></ProdctedRoute> },
        { path: 'checkout', element: <ProdctedRoute><CheckOut /></ProdctedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: 'allorders', element: <ProdctedRoute><AllOrders /></ProdctedRoute> },
        { path: 'allorders/orderDetails/:id', element: <OrderDetails /> },
        { path: 'logout', element: <Logout /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ]);

  return (
    <CartContextProvider>
      <Offline>
        <div className='network'>Only shown offline (surprise!)</div>
      </Offline>
      <Toaster />
      <RouterProvider router={routers} />
    </CartContextProvider>
  );
}

export default App;
