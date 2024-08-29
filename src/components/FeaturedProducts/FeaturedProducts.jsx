import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'

export default function FeaturedProducts() {
  let { addToCart,setnumOfCartItem,addToWishlist } = useContext(cartContext)
  const [products, setproducts] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getProducts() {
    setisloading(true)
    let { data } = await axios.get(`http://localhost:4000/api/v1/product`)
    setproducts(data.results);
    setisloading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  async function addProductToCart(productId) {
    
    let response = await addToCart(productId);
    // console.log(response.data.message==="Product Added To Cart");
    if (response.data.message==="Product Added To Cart" || response.data.message==="Created") {
      setnumOfCartItem(response.data.cart.numOfCartItems);
      toast.success(response.data.message,{duration:2000})
    }else{
      toast.error(response.data.message,{duration:2000})

    }
  }
  async function addProductToWishlist(productId) {
    
    let response = await addToWishlist(productId);
    console.log(response);
    if (response?.data?.message === 'Done') {
      toast.success(response.data.message,{duration:2000})
    }else{
      toast.error(response.data.message,{duration:2000})

    }
  }

  return (
    <div className="row">
      {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <>
          {products.map((product) => (
            <div key={product._id} className="col-md-2 text-center">
              <div className="product cursor-pointer px-2 py-3 position-relative">
                <Link to={'/product-details/' + product._id}>
                  <img className='w-100' src={product.imgCover} />
                  <span className='text-main fw-bold font-sm'>{product.category.name}</span> 
                  <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className="d-flex justify-content-between">
                    <span className='text-muted'>{product.priceAfterDiscount} EGP</span>
                    <span><i className='fas fa-star rating-color'></i>{product.ratingAvg}</span>
                  </div>

                </Link>
                <div className="d-flex justify-content-around mt-2">
                  <div>

              <i onClick={() => addProductToCart(product._id)}className="fa-solid fa-cart-plus text-main fa-2x "></i>
            </div>

<div >

<i onClick={() => addProductToWishlist(product._id)}className="fa-solid fa-heart text-main fa-2x "></i>
</div>

</div>

               
              </div>
              
            </div>
          ))}
        </>
      )}
    </div>
  )
}
