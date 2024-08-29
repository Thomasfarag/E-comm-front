import React, {useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import WhatsAppFixedButton from '../Home/WhatsAppFixedButton'

export default function Categories() {
    const [category, setcategory] = useState([])
    const [isloading, setisloading] = useState(false)

    async function getcategoires() {
      setisloading(true)
      let { data } = await axios.get(`http://localhost:4000/api/v1/category`)
      setcategory(data.results);
      setisloading(false)
    }

    useEffect(() => {
      getcategoires()
    }, [])

  return (
    <div className="container">
         <div className="row">
      {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <>
          {category?.map((cat) => (
            <div key={cat._id} className="col-md-3">
              <Link className="product cursor-pointer px-2 py-3" to={`/categoryProducts/${cat.slug}`} >
                
                  <img className='w-100 mb-2' height={400} src={cat?.image} />
                  <div className="text-center">

                  <h3 className='text-main fw-bold font-sm'>{cat?.name}</h3>
                  
                  </div>
                  
               
             
              </Link>
            </div>
          ))}
        </>
        
      )}
      
    </div>
    <WhatsAppFixedButton />

    </div>
 
    
  )
}

