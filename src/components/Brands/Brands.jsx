import React, {useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { date } from 'yup'
import { toast } from 'react-hot-toast'

export default function Brands() {

  const [brand, setbrand] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getBrands() {
    setisloading(true)
    let { data } = await axios.get(`http://localhost:4000/api/v1/brand`)
    setbrand(data.results);
    setisloading(false)
  }

  useEffect(() => {
    getBrands()
  }, [])

 

  return (
    <div className="container">
          <div className="row">
      {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <>
          {brand.map((product) => (
            <div key={product._id} className="col-md-2">
              <div className="product cursor-pointer px-2 py-3">
                <Link >
                  <img className='w-100' src={product.logo} />
                  <div className="text-center">

                  <h3 className='text-main fw-bold font-sm'>{product.name}</h3>
                  
                  </div>
                  
                </Link>
             
              </div>
            </div>
          ))}
        </>
        
      )}
      
    </div>
    </div>

    
  )
}
