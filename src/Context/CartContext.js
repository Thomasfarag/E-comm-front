import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext =createContext()



export function CartContextProvider(props){
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItem] = useState(0)


    async function getLCart() {
      try {
        let response = await getLoggedUserCart();
        
        if (response?.data?.message === 'Done' && response?.data?.cart) {
          const cartId = response.data.cart._id;
          
          // Check if cartId is not null or undefined
          if (cartId) {
            console.log(cartId + " dddd");
            setnumOfCartItem(response.data.cart.numOfCartItems || 0);  // Set default value to 0 if undefined
            setcartId(cartId);
          } else {
            console.warn('Cart ID is null or undefined');
          }
        } else {
          console.warn('Response message not "Done" or cart is missing');
        }
      } catch (error) {
        console.error('Error in getLCart:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
    

useEffect(() => {

  getLCart();

}, [])


let headers={token:localStorage.getItem('userToken')}


function addToCart(ProductId) {
    return axios.post(`http://localhost:4000/api/v1/cart`, {
        product: ProductId
    }, {
      headers: headers
    })
    .then(response => {
      return response; // Return only the response data
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add to cart'); // Throw an error to be caught by the caller
    });
  }
  
function getLoggedUserCart(){
    return axios.get(`http://localhost:4000/api/v1/cart`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function removeCartItem(ProductId){
    return axios.delete(`http://localhost:4000/api/v1/cart/${ProductId}`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function updateCartquantity(productId, quantity) {
    console.log('Sending request to update product quantity:', { productId, quantity });
    return axios.put(
      `http://localhost:4000/api/v1/cart/`,
      {
        quantity: quantity,
        product: productId
      },
      {
        headers: headers
      }
    )
    .then((response) => response)
    .catch((error) => {
      console.error('Error in updateCartquantity:', error.response ? error.response.data : error.message);
      throw error;
    });
  }
  
  
  function clearCart(){
    return axios.delete(`http://localhost:4000/api/v1/cart`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function onlinePayment(cartId, shippingAddress) {
  return axios.post(`http://localhost:4000/api/v1/order/checkout/${cartId}`, {
      shippingAddress: shippingAddress
  }, {
      headers: headers
  })
  .then(response => response)
  .catch(error => {
      console.error('Error in onlinePayment:', error.response ? error.response.data : error.message);
      throw error;
  });
}


function addToWishlist(ProductId){
    return axios.patch(`http://localhost:4000/api/v1/wishList`,{
           productId:ProductId 
    },{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function getLoggedUserWishlist(){
    return axios.get(`http://localhost:4000/api/v1/wishList`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
}
function removeWishlistItem(){
    return axios.delete(`http://localhost:4000/api/v1/wishList/`,{
        headers:headers
    }).then((reponse)=>reponse)
    .catch((error)=>error)
} 



 return <cartContext.Provider value={{setnumOfCartItem,getLCart,numOfCartItems,cartId, addToCart ,getLoggedUserCart,removeCartItem,updateCartquantity,clearCart,onlinePayment,addToWishlist,getLoggedUserWishlist,removeWishlistItem }}>

        {props.children}
    </cartContext.Provider>
}