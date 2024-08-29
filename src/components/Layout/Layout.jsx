import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'


export default function Layout({userData,logout}) {

// console.log(userData.role);

  return <>
  <Navbar userData={userData} logout={logout}/>
  {/* {userData.role=="admin"?<h1>done</h1>:<h1>not done</h1>} */}
  <div className="">
   <Outlet></Outlet>
  </div>
  <Footer/>

  </>
}
