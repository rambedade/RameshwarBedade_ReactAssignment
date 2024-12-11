import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div style={{
        border: "1 px solid red",
        borderRadius:"7px",
        padding:"16px",
        textAlign:"center"
    }}>
       <img  
          src={product.image}
          alt={product.title}
          style={{width:"150px , height:150 px"}}
        />
        <h4>{product.title}</h4>
        <p>Price:${product.price}</p>
        <p>Rating:{product.rating.rate}</p>
    </div>
  )
}

export default ProductCard
