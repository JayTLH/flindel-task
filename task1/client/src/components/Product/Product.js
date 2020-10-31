import React from 'react'
import './Product.scss';

// component to display eligible products
export default function Product(props) {
  return (
    <div className={`product ${props.animation ? 'fade-in' : 'fade-out'}`}>
      <p className="product__info">Id: {props.id}</p>
      <p className="product__info">Company: {props.company}</p>
      <p className="product__info">Price: $99.99</p>
      <p className="product__info">
        Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam.
        </p>
    </div>
  )
}
