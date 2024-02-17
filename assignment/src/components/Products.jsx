import React from 'react';
import './Home.css'

const Products = ({key ,product, addToCart}) => {
  return (
    <div className="product-card">
<div>
    <img src={product.thumbnail} alt="thumbnail" />
</div>
<div className="product-details">
    <p>{product.title}</p>
    <p> Price : Rs {product.price}</p>
    <button onClick={addToCart}>Add to cart</button>
</div>
    </div>
  )
}

export default Products