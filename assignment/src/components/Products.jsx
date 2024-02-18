import React from 'react';
import './Home.css'

const Products = ({key ,product, addToCart,cart,removeFromCart}) => {
  const isInCart = cart.some((item) => item.id === product.id);
  return (
    <div className="product-card">
<div>
    <img src={product.thumbnail} alt="thumbnail" />
</div>
<div className="product-details">
    <p>{product.title}</p>
    <p> Price : Rs {product.price}</p>
    {isInCart ? (
          <button onClick={() => removeFromCart(product)}>Remove from cart</button>
        ) : (
          <button onClick={() => addToCart(product)}>Add to cart</button>
        )}
</div>
    </div>
  )
}

export default Products