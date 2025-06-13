import React from 'react'

const Product = ({ product }) => {
  const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = product;
  return (
    <div className='product-card'>
         <div className='product-inner'>
      <div className='product-img'>
        <img src={thumbnail} alt={title} />
      </div>
      <div className='product-detail'>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Discount: {discountPercentage}%</p>
        <p>Rating: {rating}</p>
        <p>Stock: {stock}</p>
        <p>Brand: {brand}</p>
        <p>Category: {category}</p>
      </div>

      </div>
    </div>
  )
}

export default Product
